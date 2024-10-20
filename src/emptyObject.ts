/**
 * enforces empty object (= object with no props).
 *
 * Type "{}" is not the same, instead of representing an empty object, it represents any value except null and undefined.
 *
 * @export
 * @since 1.0.0
 */
export type EmptyObject = Record<PropertyKey, never>;
