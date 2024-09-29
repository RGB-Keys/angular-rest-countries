export interface FilterOptions {
    id: string;
    label: string;
    options: string[]; 
    onChange: (event: Event) => void;
    disabled?: boolean; 
}