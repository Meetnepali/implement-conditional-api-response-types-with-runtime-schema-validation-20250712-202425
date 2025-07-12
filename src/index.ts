/**
 * Notification Payload System (partial)
 * Task: Complete the type-safe, versioned conditional payload & validation system as described in the README.
 */

// ---- Type Definitions ----

export type NotificationMethod = 'Email' | 'Push' | 'InApp';
export type EventType = 'Marketing' | 'Transactional';
export type NotificationVersion = 'v1' | 'v2';

// Possible Feature Flags
export type FeatureFlags = {
    enableDeepLinks?: boolean;
    enablePriority?: boolean;
};

// Possible Account Tiers
export type AccountTier = 'free' | 'premium';

// Discriminated union for v1 Notification Payloads
export type NotificationPayloadV1 = (
  | {
      version: 'v1';
      notificationType: 'Email';
      eventType: EventType;
      to: string;
      subject: string;
      body: string;
      featureFlags?: FeatureFlags;
      // (feature: enableDeepLinks - only if enabled)
      deepLinkUrl?: string;
    }
  | {
      version: 'v1';
      notificationType: 'Push';
      eventType: EventType;
      deviceToken: string;
      message: string;
      featureFlags?: FeatureFlags;
      // (feature: enablePriority - only if enabled & premium)
      priority?: 'normal' | 'high';
    }
  | {
      version: 'v1';
      notificationType: 'InApp';
      eventType: EventType;
      userId: string;
      title: string;
      message: string;
    }
);

// Mapped schemas for v2, showing evolution (subject is optional in v2 for email, priority always allowed for premium push)
export type NotificationPayloadV2 = (
  | {
      version: 'v2';
      notificationType: 'Email';
      eventType: EventType;
      to: string;
      subject?: string;
      body: string;
      featureFlags?: FeatureFlags;
      deepLinkUrl?: string; // always controlled by feature flag
      // new field in v2
      footer?: string;
    }
  | {
      version: 'v2';
      notificationType: 'Push';
      eventType: EventType;
      deviceToken: string;
      message: string;
      priority?: 'normal' | 'high'; // allowed if premium
      featureFlags?: FeatureFlags;
    }
  | {
      version: 'v2';
      notificationType: 'InApp';
      eventType: EventType;
      userId: string;
      title: string;
      message: string;
      // new in v2
      imageUrl?: string;
    }
);

// Union of all versions
export type NotificationPayload = NotificationPayloadV1 | NotificationPayloadV2;

// ---- Type Guards for Feature Flag Fields ----

// TODO: Implement type guard functions, e.g., hasDeepLink
export function hasDeepLink(payload: NotificationPayload, featureFlags?: FeatureFlags): payload is (NotificationPayload & { deepLinkUrl: string }) {
    // Stub: Implement based on payload.version, notificationType, featureFlags.enableDeepLinks
    return false;
}

export function hasPriority(payload: NotificationPayload, featureFlags: FeatureFlags | undefined, tier: AccountTier): payload is (NotificationPayload & { priority: 'normal' | 'high' }) {
    // Stub: Implement based on payload.version, notificationType, featureFlags.enablePriority, accountTier
    return false;
}

// ---- Runtime Validation Skeleton ----

// Mimic a schema-based validator for payloads. Candidate must complete
export function validateNotificationPayload(payload: any, featureFlags: FeatureFlags, accountTier: AccountTier): { valid: boolean; errors?: string[] } {
    // TODO: Implement based on union version, fields, and featureFlags/accountTier logic
    return { valid: false, errors: ["Not implemented"] };
}

// ---- Example Payloads ----

const validV1Email: NotificationPayload = {
    version: 'v1',
    notificationType: 'Email',
    eventType: 'Marketing',
    to: 'user@example.com',
    subject: 'Hello',
    body: 'Welcome!',
    featureFlags: { enableDeepLinks: true },
    deepLinkUrl: 'https://app.site/activate'
};

const invalidV1Email: NotificationPayload = {
    version: 'v1',
    notificationType: 'Email',
    eventType: 'Marketing',
    to: 'user@example.com',
    body: 'No subject!',
    deepLinkUrl: 'https://app.site/should-fail-feature' // missing feature flag
};

const validV2PushPremium: NotificationPayload = {
    version: 'v2',
    notificationType: 'Push',
    eventType: 'Transactional',
    deviceToken: 'abcd-efgh',
    message: 'Your reward is ready',
    priority: 'high',
    featureFlags: { enablePriority: true }
};

const invalidV2PushFree: NotificationPayload = {
    version: 'v2',
    notificationType: 'Push',
    eventType: 'Transactional',
    deviceToken: 'abcd-zzzz',
    message: 'You got XP',
    priority: 'high' // should not be allowed for free tier
};

// TODO: Write code that runs the validator on these payloads and prints (console.log) results
// (Leave incomplete for candidate to finish)

// Example Usage (Unimplemented):
// console.log(validateNotificationPayload(validV1Email, validV1Email.featureFlags || {}, 'premium'))
// ...
