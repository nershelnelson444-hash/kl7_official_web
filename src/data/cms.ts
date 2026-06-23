import cmsData from './cms.json';

export interface CMSInventoryItem {
    id: string;
    slug: string;
    draft: boolean;
    fieldData: {
        i251F_cLI: { value: string }; // Name
        yhmUaSJgn: { value: string }; // Thumbnail image URL
        HKJOw7KI7: { value: string }; // Description HTML
        AsGqvZIRE: { value: string }; // Year
        FhhhIfKRq: { value: string }; // Make
        dWaufMx5m: { value: string }; // Model
        YwnNt4bSJ: { value: string }; // Trim
        N5J_P9k5F: { value: string }; // Ref
        nbtxPVxMC: { value: string }; // VIN
        ieALPznS3: { value: string }; // Price
        quZuCOPdT: { value: string[] }; // Price Range Collection Ref
        mRbkUObKn: { value: boolean }; // Featured
        BGGrMCEzn: { value: boolean }; // Sold
        oBzwmlvOK: { value: string }; // Badge
        FixYCUMxe: { value: number }; // Mileage
        b0EvjjHmu: { value: string }; // Engine
        aoQqPXyK7: { value: string }; // Horsepower
        DUdYPJIP0: { value: string }; // Transmission
        VOiJF5nuX: { value: string }; // Drivetrain
        gCShDyGRg: { value: string }; // Body Type (Enum)
        WeRM4zBli: { value: string[] }; // Body Type Ref
        XKcYqdDj3: { value: string }; // Fuel Type
        BpRFrjZwy: { value: string }; // Exterior Color
        BsutmQ78B: { value: string }; // Interior Color
        hNda28YpA: { value: number }; // Seats
        R6wR_I_UP: { value: number }; // Doors
        P8jIPIoSA: { value: string }; // Features HTML
        mwpOsOmon: { value: string }; // Condition Enum
        i2W8PQvdS: { value: number }; // Previous Owners
        AVWSdqHPq: { value: string }; // Service History
        S3iwwd2B1: { value: string }; // Warranty Type
        Vj1xGOKCN: { value: string }; // Warranty Expiry
        cMANx2t9u: { value: boolean }; // Requires Appointment
        BVMRK1GFF?: { value: string }; // Gallery Image 1
        GhhqWNVLi?: { value: string }; // Gallery Image 2
        XGFwlZjwx?: { value: string }; // Gallery Image 3
        c7AF1En5j?: { value: string }; // Gallery Image 4
        // More images...
    };
}

export interface CMSBlogItem {
    id: string;
    slug: string;
    draft: boolean;
    fieldData: {
        vE5dzHwR_: { value: string }; // Title
        OxK7M6yCN: { value: boolean }; // Featured
        Kbtb6KX_T: { value: string }; // Excerpt
        ems8fj_dg: { value: string }; // Hero Image URL
        zvFxw4BYS: { value: string }; // Content HTML
    };
}

export interface CMSLegalItem {
    id: string;
    slug: string;
    draft: boolean;
    fieldData: {
        L_A48SMLq: { value: string }; // Title
        HLi4cRCgY: { value: string }; // Date
        WM5Ns79EH: { value: string }; // Content HTML
    };
}

export const inventory: CMSInventoryItem[] = cmsData.inventory as CMSInventoryItem[];
export const blog: CMSBlogItem[] = cmsData.blog as CMSBlogItem[];
export const legal: CMSLegalItem[] = cmsData.legal as CMSLegalItem[];

export function getInventoryItemBySlug(slug: string): CMSInventoryItem | undefined {
    return inventory.find(item => item.slug === slug);
}

export function getBlogItemBySlug(slug: string): CMSBlogItem | undefined {
    return blog.find(item => item.slug === slug);
}

export function getLegalItemBySlug(slug: string): CMSLegalItem | undefined {
    return legal.find(item => item.slug === slug);
}

export function getFeaturedInventory(): CMSInventoryItem[] {
    return inventory.filter(item => item.fieldData.mRbkUObKn?.value === true);
}

export function getFeaturedBlog(): CMSBlogItem[] {
    return blog.filter(item => item.fieldData.OxK7M6yCN?.value === true);
}
