import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";

export default function SearchBar({placeholder, handleSubmit, handleChange}) {
  return (
    <form
      className="h-14 mb-7 flex items-center gap-x-2"
      onSubmit={handleSubmit} 
    >
      <Input 
        name="search_bar" 
        type="text" 
        placeholder={placeholder} autoComplete="off"
        onChange={handleChange}
      />
      <Button type="submit">Buscar</Button>
    </form>
  );
}