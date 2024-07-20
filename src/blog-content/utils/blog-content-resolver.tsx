import {
  EnsureMessageDeliveryInDistributedSystemSlug,
  EnsureMessageDeliveryInEventDrivenSystem,
  EnsureMessageDeliveryInDistributedSystemPreview,
} from '../ensure-message-delivery-event-driven-system/ensure-message-delivery-event-driven-system';

export const BlogContentResolver = ({ slug }: { slug: string }) => {
  if (slug === EnsureMessageDeliveryInDistributedSystemSlug) {
    return <EnsureMessageDeliveryInEventDrivenSystem />;
  }

  return <></>;
};

export const BlogContentPreviewResolver = ({ slug }: { slug: string }) => {
  if (slug === EnsureMessageDeliveryInDistributedSystemSlug) {
    return <EnsureMessageDeliveryInDistributedSystemPreview />;
  }

  return <></>;
};
