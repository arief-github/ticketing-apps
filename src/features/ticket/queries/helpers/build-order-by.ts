type SortDirection = "asc" | "desc";
type SortField = "createdAt" | "bounty";
type OrderByObject = Partial<Record<SortField, SortDirection>>;

// Helper function to build orderBy based on sort parameter
const buildOrderBy = (sort: string | string[] | undefined): OrderByObject | OrderByObject[] => {
    // Default sort
    if (!sort || typeof sort !== "string") {
        return { createdAt: "desc" };
    }

    // Parse sort string into field and direction
    const parseSortItem = (sortItem: string): OrderByObject | null => {
        const [field, direction] = sortItem.split("_");
        
        if ((field === "createdAt" || field === "bounty") && 
            (direction === "asc" || direction === "desc")) {
            return { [field]: direction } as OrderByObject;
        }
        
        return null;
    };

    // Handle combined sorting (multiple fields)
    if (sort.includes(",")) {
        const sortItems = sort.split(",");
        const orderByArray = sortItems
            .map(parseSortItem)
            .filter((item): item is OrderByObject => item !== null);
        
        return orderByArray.length > 0 ? orderByArray : { createdAt: "desc" };
    }

    // Handle single field sorting
    const orderBy = parseSortItem(sort);
    return orderBy || { createdAt: "desc" };
};

export default buildOrderBy;