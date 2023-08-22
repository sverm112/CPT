export * as APP_ROUTES from "./routes";
//Non Prod

export const Base_URL = 'http://10.147.172.18:9193/';
export const DASHBOARD_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Dashboard_Dev?rs:embed=true" 
export const ALLOCATION_BY_MARKET_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Market_Dev?rs:embed=true"
export const ALLOCATION_BY_PROJECT_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Project_Dev?rs:embed=true"
export const ALLOCATION_BY_RESOURCE_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Resource_Dev?rs:embed=true"
export const HOLIDAY_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Holiday%20list_Dev?rs:embed=true"

//Production
// export const Base_URL = 'http://10.147.172.18:9190/';
// export const DASHBOARD_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Dashboard?rs:embed=true" 
// export const ALLOCATION_BY_MARKET_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Market?rs:embed=true"
// export const ALLOCATION_BY_PROJECT_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Project?rs:embed=true"
// export const ALLOCATION_BY_RESOURCE_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Allocation%20By%20Resource?rs:embed=true"
// export const HOLIDAY_REPORT = "http://colo-sqlrptqa/Reports/powerbi/CPT/Holiday%20list?rs:embed=true"

// Get
export const GET_ALL_RESOURCES = `${Base_URL}api/v1/Resources/GetAllResources`;
export const GET_ALL_MARKETS = `${Base_URL}api/v1/Markets/GetAllMarkets`;
export const GET_ALL_LOCATIONS = `${Base_URL}api/v1/Location/GetAllLocations`;
export const GET_ALL_SUB_LOCATIONS = `${Base_URL}api/v1/SubLocation/GetAllSubLocations`;
export const GET_ALL_HOLIDAYS = `${Base_URL}api/v1/HolidaysList/GetAllHolidaysLists`;
export const GET_ALL_PROJECTS = `${Base_URL}api/v1/Projects/GetAllProjects`;
export const GET_ALL_PTOS = `${Base_URL}api/v1/PTOs/GetAllPTOs`;
export const GET_ALL_PTO_TYPES = `${Base_URL}api/v1/PTOType/GetAllPTOTypes`;
export const GET_ALL_PROJECT_ALLOCATIONS = `${Base_URL}api/v1/ProjectAllocations/GetAllProjectAllocations`;
export const GET_TOTAL_ALLOCATED_PERCENTAGE = `${Base_URL}api/v1/ProjectAllocations/GetTotalAlocPerForResourceId`;
export const GET_TOTAL_PTO_DAYS = `${Base_URL}api/v1/PTOs/GetPTODaysPerResource`;
// export const GET_ALL_PROJECT_ALLOCATIONS = `${Base_URL}api/v1/ProjectAllocations/GetAllProjectAllocations`;

// Post
export const POST_BULK_UPLOAD_EMPLOYEE = `${Base_URL}api/v1/Resources/BulkUploadResources`;
export const POST_RESOURCE = `${Base_URL}api/v1/Resources/PostResources`;
export const POST_HOLIDAY = `${Base_URL}api/v1/HolidaysList/PostHoliday`;
export const POST_MARKET = `${Base_URL}api/v1/Markets/PostMarket`;
export const POST_PROJECT = `${Base_URL}api/v1/Projects/PostProject`;
export const POST_BULK_UPLOAD_PROJECTS = `${Base_URL}api/v1/Projects/BulkUploadProjects`;
export const POST_PTO = `${Base_URL}api/v1/PTOs/PostPTO`;
export const POST_PROJECT_ALLOCATION = `${Base_URL}api/v1/ProjectAllocations/PostProjectAllocation`;
// export const POST_PTO = `${Base_URL}api/v1/PTOs/PostPTO`;

// Update
export const UPDATE_RESOURCE = `${Base_URL}api/v1/Resources/UpdateResources`;
export const UPDATE_MARKET = `${Base_URL}api/v1/Markets/UpdateMarket`;
export const UPDATE_PROJECT = `${Base_URL}api/v1/Projects/UpdateProject`;
export const UPDATE_PTO = `${Base_URL}api/v1/PTOs/UpdatePTO`;
export const UPDATE_HOLIDAY = `${Base_URL}api/v1/HolidaysList/UpdateHoliday`;
export const UPDATE_PROJECT_ALLOCATION = `${Base_URL}api/v1/ProjectAllocations/UpdateProjectAllocation`;
// export const UPDATE_PTO = `${Base_URL}api/v1/PTOs/UpdatePTO`;

//Delete
export const DELETE_ALLOCATION = `${Base_URL}api/v1/ProjectAllocations/DeleteProjectAllocation`;
export const DELETE_PTO = `${Base_URL}api/v1/PTOs/DeletePTO`;
export const DELETE_RESOURCE = `${Base_URL}api/v1/Resources/DeleteResources`;
export const DELETE_PROJECT = `${Base_URL}api/v1/Projects/DeleteProject`;
export const DELETE_HOLIDAY = `${Base_URL}api/v1/HolidaysList/DeleteHoliday`;
export const DELETE_MARKET = `${Base_URL}api/v1/Markets/DeleteMarket`;
