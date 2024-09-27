export function getSelectValue(event: Event): string {
    const selectElement = event.target as HTMLSelectElement;
    return selectElement.value;
}

export function showOptionsVisibility(currentState: boolean): boolean {
    return !currentState;
}