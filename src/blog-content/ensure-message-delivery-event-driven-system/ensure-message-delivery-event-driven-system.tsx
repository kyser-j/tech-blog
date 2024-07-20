import BlogPreview from '@/components/blogs/blog-preview';
import BlogTitle from '@/components/typography/blog-title';
import Image from 'next/image';

import initialArchitectureDiagram from './initial-architecture-diagram.png';
import eventSourcingDiagram from './event-sourcing-diagram.png';
import transactionOutboxDiagram from './transaction-outbox-diagram.png';
import durableEventSourcingDiagram from './durable-event-sourcing.png';
import Link from 'next/link';

export const EnsureMessageDeliveryInDistributedSystemSlug = 'ensure-message-delivery-in-distributed-event-driven-system';
const title = 'How To Ensure Message Delivery In A Distributed Event Driven System';
const previewContent = '';

export const EnsureMessageDeliveryInEventDrivenSystem = () => {
  return (
    <>
      <BlogTitle title={title} />

      <h2>Initial Implementation</h2>

      <p>
        You&apos;ve done it. You created an asynchronous, event-driven system to process information coming from your application at lightning speed. To
        accomplish this, you implemented a message topic. One producer, multiple consumers. Anyone can decide to listen in on these business-wide events coming
        from your app; all that needs done is to hook up another consumer! Here is a diagram of what is in production right now:
      </p>

      <Image src={initialArchitectureDiagram} alt='Image of the initial architecture diagram with one producer, a messaging topic, and three consumers.' />

      <p>Simplicity and perfection.</p>

      <h2>The Next Week</h2>

      <p>
        <em>Message from finance:</em> Hey Wayback Boi! We noticed we&apos;re missing some information on the PayPal transactions that occurred. Can you figure
        out why that info didn&apos;t make it to the database?
      </p>

      <p>
        <em>Wayback Boi Response:</em> On it!
      </p>

      <p>
        After hours of combing through logs, you finally hit gold - &quot;Error: Unable to send message after 10 attempts.&quot;. This isn&apos;t gold,
        it&apos;s the gross hard caramel candy your grandma found in her purse at the Sunday church service - how long has that been there? Seems like the
        producer sending the messages that a PayPal transaction has occurred keeps failing to send the message for some reason. How do you keep that message
        intact if it fails to send again? After the realization of what this is, the only way forward is to eat the candy - rearchitecting this portion of the
        system to ensure all messages are delivered all the time.
      </p>

      <h2>Attempt #1 At Rearchitecting</h2>

      <p>Back to the whiteboard - what exactly went wrong? You try to list out all the issues your first try could possibly have:</p>

      <ul>
        <li>Retry Logic - This is already there, but maybe we don&apos;t need 10 attempts</li>
        <li>The message has no where to go if we can&apos;t send it due to network issues</li>
        <li>If the message can&apos; be delivered or expires on the topic, what happens?</li>
      </ul>

      <p>
        After the senior dev blew you off because he has bigger fish to fry (I mean you&apos;re only a level 2 dev, so your problems are meaningless of course)
        you decide to do some academic research yourself - Google + Chat GPT - and whip up something Martin Fowler would be proud of:
      </p>

      <Image src={eventSourcingDiagram} alt='Image of an event sourcing diagram' />

      <p>Event sourcing! That&apos;s how this problem is solved. You explain the solution to your coworker</p>

      <p>
        <em>The flow of the diagram goes like this</em>
      </p>
      <ul>
        <li>
          <em>
            When a producer has an event that happened in the application which needs to be sent on the message topic, it will first save the event details to
            the database
          </em>
        </li>
        <li>
          <em>Then, the producer will create a message and put it on the topic for multiple consumers to use</em>
        </li>
        <li>
          <em>When a consumer gets a message, it will look that event up in the database to get the details and process it as needed</em>
        </li>
        <li>
          <em>If a message on the topic is not able to be delivered or expired, then it goes to the dead letter queue, where we can manually fix it</em>
        </li>
      </ul>

      <p>
        This explanation also includes how in the event sourcing pattern, the database is an append only event store, meaning records in there cannot be updated
        or deleted. If a producer creates an event that needs to be undone, another event needs to be created to undo the previous event. Pretty cool, eh? That
        is, until your coworker points out some glaring holes.
      </p>

      <p>
        <em>
          What happens if the database is down and the producer can&apos;t save an event? Or, what if it saves an event to the database and it can&apos;t send
          the message afterwards? If I can&apos;t update any records in the event store, how will I know if they haven&apos;t been processed?
        </em>
      </p>

      <p>Sigh... *sad puppy face* - &quot;Guess I&apos;ll try again&quot; you think to yourself, sulking off to the monotonous gray sea of office desks.</p>

      <h2>Attempt #2 At Rearchitecting</h2>

      <p>We need to brainstorm... what are our problem areas right now?</p>

      <ul>
        <li>
          With event sourcing, datastores are append only. This means we can&apos;t go back and update a database record to say it&apos;s been processed. If
          sending a message on the topic fails but we were able to save the record in the database, what then?
        </li>
        <li>
          Having one application process be responsible for two distributed transactions (insert a row to a database and put a message on a topic) seems like a
          recipe for something bad to happen, maybe not quite a disaster though.
        </li>
        <li>
          If our database fails or there&apos;s a regional outage in our cloud provider, we can no longer save events or send messages (assuming we&apos;re
          ignoring database failovers right now, which we are :) )
        </li>
      </ul>

      <p>
        Think, think, think! You don&apos;t immediately have the answer to this one, but the internet has the answer to everything! There&apos;s definitely no
        wrong information out there, especially about abstract concepts (lol). So, you turn to your favorite cloud provider and thumb through the index cards of
        design patterns until you come across:{' '}
        <Link href='https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html'>
          the transactional outbox pattern
        </Link>
        .
      </p>

      <p>Wow, such design, much pattern! You decide to diagram it out:</p>

      <Image src={transactionOutboxDiagram} alt='Image of a transactional outbox cloud pattern with event sourcing' />

      <p>Obligatory description because we all know you&apos;re not going to click that AWS link and read the article.</p>

      <ul>
        <li>
          When the producer has a message, it will save 2 database records in one transaction - the actual event that happened in the events table, and then the
          same event in an outbox table. This outbox table is there to say &quot;hey, I have a message ready to be processed&quot;
        </li>
        <li>
          The event processing middleman (this could be a timer triggered application or some kind of stream triggered application that reads a stream of
          database changes) takes the outbox message and puts it on the topic. The outbox message is then either deleted or updated to say the event has been
          processed.
        </li>
        <li>Consumers consume the event message and everyone is happy.</li>
      </ul>

      <p>
        This is perfect... too perfect... your spidey senses are tingling. What could go wrong. Wait. This literally just looks like the very first architecture
        diagram we had at the beginning of this article! Now there&apos;s just an extra middle management layer for not really any extra gain other than a
        persistent event (assuming we can even save it). You decide to list out the problems with this.
      </p>

      <ul>
        <li>
          There is a hard bottleneck on a single resource - the database. A regional failure, message being in the wrong schematic format, or persistent network
          error all stops us from ever processing that message.
        </li>
        <li>
          We still have the issue of what if the message topic has network issues as well and an outbox record has been marked with a status of &quot;In
          Progress&quot;. If the message is never sent, at least we have a record of what is waiting to be processed and we can manually go in and retry those
          records. But, the point of everything is to keep as hands off as possible. We can definitely do better.
        </li>
      </ul>

      <p>
        Before you talk to the senior engineer again, you decide to go back to the drawing board one last time. Because if we hear the request to rearchitect
        one more time after this we&apos;re going to lose it.
      </p>

      <h2>Attempt #3 At Rearchitecting</h2>

      <p>
        At this point, Chat GPT is hallucinating solutions utilizing Area 51 tech and Google is saying you have cancer... So now you resort to technical
        articles - the cesspool of blogs ripping off other blogs with no descriptions of their code to get Microsoft MVP and TikTok influencers teling you the
        past 50 years of software development is WRONG!
      </p>

      <p>
        <em>McDonald&apos;s?</em>
      </p>

      <p>
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
      </p>

      <p>What if I just left you hanging there? That would be pretty funny.</p>

      <p>
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
        .
        <br />
      </p>

      <p>
        Ok for reals, here&apos;s the McDonald&apos;s technical blog article that will help you save the day and get promoted from level II to senior{' '}
        <Link href='https://medium.com/mcdonalds-technical-blog/mcdonalds-event-driven-architecture-the-data-journey-and-how-it-works-4591d108821f'>here</Link>!
      </p>

      <p>For this architecture, we&apos;re going to combine a few concepts from our previous attempts and create a super duper dumpster fire of amazement.</p>

      <Image src={durableEventSourcingDiagram} alt='Image of a durable event sourcing architectural diagram.' />

      <ul>
        <li>
          <em>
            First, when our producer app has an event message it will save that message to the event database so that other event consumers can see the full
            details of the event.
          </em>
        </li>
        <li>
          <em>
            That same producer will then send a message to the message topic signaling that a new event occurred. Any consumers of the topic can use that
            message and pull the details of the event from the event database.
          </em>
        </li>
        <li>
          <em>
            If the event is not able to be saved to the database or the producer is able to save the event to the database but unable to send an event message
            on the topic, then the producer will dump the event message to a different database to allow other applications to handle automated retries.
          </em>
        </li>
        <li>
          <em>An automated retry application will handle any failed event messages in this database and attempt to resend them on the topic to be consumed.</em>
        </li>
        <li>
          <em>
            If there is an event message that gets sent to the dead letter queue, it was either undeliverable to a consumer or some other error occurred during
            the processing of the message. An admin application will be created to manually view these message, fix whatever data needs to be fixed, then send
            those messages back on the topic to be consumed.
          </em>
        </li>
      </ul>

      <p>
        I call this &quot;<em>Durable Event Sourcing</em>&quot;. Honestly, not really sure the name makes sense but it sounds snazzy huh?
      </p>

      <p>
        With this architecture, we can go hog wild on databases in different regions to ensure at least something is up and running, beefed up messaging queues
        to handle high loads, and backend manual admin applications that help us check a failed event or message, make a quick fix, and send it on its way.
        There are definitely other methods of ensuring a message gets delivered, but I hope this architecture can help you start thinking about ways your app or
        company can start moving in the direction of resiliency rather than quickly throwing something together and praying it works for a while.
      </p>

      <p>~~~Congrats on the promotion to senior.~~~</p>
    </>
  );
};

export const EnsureMessageDeliveryInDistributedSystemPreview = () => {
  return <BlogPreview imageName='computer.jpg' previewContent={previewContent} slug={EnsureMessageDeliveryInDistributedSystemSlug} title={title} />;
};
