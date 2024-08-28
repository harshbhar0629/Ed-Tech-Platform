const baseUrl = process.env.REACT_APP_BASE_URL;
console.log("Base url", baseUrl);
export const categories = {
	CATEGORIES_API: baseUrl + "/course/showAllCategories",
};