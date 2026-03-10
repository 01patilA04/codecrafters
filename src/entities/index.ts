/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: hospitalresources
 * Interface for HospitalResources
 */
export interface HospitalResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceName?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  availabilityStatus?: string;
  /** @wixFieldType text */
  specifications?: string;
  /** @wixFieldType text */
  department?: string;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}
