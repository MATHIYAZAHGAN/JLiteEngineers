/**
 * Centralized Brand Configuration for JLite
 * 
 * Provides unified brand naming, identity constants, contact credentials, and canonical domain references.
 * The domain name is 'jliteengineers.com', while the public brand name is 'JLite'.
 */
export const BRAND = {
  name: 'JLite',
  nameUpper: 'JLITE',
  legalName: 'M/s. JLite',
  tagline: "Govt. A-Grade License • 33kV",
  domain: 'jliteengineers.com',
  websiteUrl: 'https://www.jliteengineers.com',
  email: 'jlite@jliteengineers.com',
  phone: '+91 73581 78174',
  phoneRaw: '+917358178174',
  headOffice: 'No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042',
  branchOffice: '7/23 A3, 2nd Floor, Police Officer Road, St Thomas Mount, Chennai - 600016'
} as const;

export type BrandConfig = typeof BRAND;

