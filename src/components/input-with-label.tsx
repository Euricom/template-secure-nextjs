import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputHTMLAttributes } from "react";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: string;
  }
  
  export function InputWithLabel({ label, id, error, ...props }: InputWithLabelProps) {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
