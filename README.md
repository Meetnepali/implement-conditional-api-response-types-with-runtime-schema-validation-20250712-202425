# TypeScript Notification Payload Validation Assessment

## Task Overview

You are required to build a versioned, type-safe notification payload system using TypeScript. This involves handling schema evolution between API versions, enforcing feature flag and account tier logic for certain fields, and implementing both compile-time and runtime validation.

### Requirements

- Define discriminated unions for notification method (`Email`, `Push`, `InApp`) and event type (`Marketing`, `Transactional`).
- Use mapped/types to show how payload schemas evolve between `v1` and `v2` for each notification method (see provided stubs).
- Implement type guards so feature-flag-gated fields are only accessed when permitted.
- Write a runtime validator function that checks incoming payloads against the expected schema (as well as feature flag and account tier constraints).
- Demonstrate the system by running the validator on both valid and invalid payload samples for v1 and v2, showing feature flag and tier gating works.

Focus only on type modeling and runtime validation, not actual delivery of notifications.

## Getting Started

1. **Install dependencies**

    ```bash
    ./install.sh
    ```

2. **Run the sample code**

    ```bash
    ./run.sh
    ```

    (Or use `npx ts-node src/index.ts` after install)

3. **Implement Solution**

    - Complete the type guards and runtime validation logic as required in `src/index.ts`.
    - Ensure runtime validation strictly follows schema and feature flag logic for v1/v2 and all notification methods.
    - Validate the given sample payloads, logging the results.

4. **How to Verify**

    - After implementation, running `./run.sh` should validate all sample payloads, showing correct pass/fail status and errors.
    - Runtime validation should:
        - Pass for valid payloads (with required/allowed fields based on feature flags/tier)
        - Fail for payloads that misuse feature-flag fields or violate schema rules

## Notes
- All coding and validation is local. No external API calls are required.
- Solution should be type-safe and use idiomatic TypeScript.
- You may reorganize/add code, but keep the focus on the schema/validation problem.

---

**Good luck!**
