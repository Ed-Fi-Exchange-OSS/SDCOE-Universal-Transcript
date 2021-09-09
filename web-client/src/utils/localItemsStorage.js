/**
 * This function takes input array of objects in [{key,value}] format and stores items in localStorage
 * @param {Array}
 */
export function localItemsStorage(items) {
  items.forEach(item => {
    localStorage.setItem(item.key, item.value);
  });
}
