export function getSelectValue(event: Event): string {
    const selectElement = event.target as HTMLSelectElement;
    return selectElement.value;
}