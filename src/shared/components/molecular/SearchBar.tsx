import { Search } from 'lucide-react';
import { Input } from '../ui/Input';


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export const SearchBar = ({
    value,
    onChange,
    placeholder = 'Buscar productos...',
    className = '',
}: SearchBarProps) => {
    return (
    <div className={className}>
        <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        icon={<Search size={18} />}
        />
    </div>
    );
};