declare module '@/components/ui/card' {
    export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  }
  
  declare module '@/components/ui/button' {
    export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  }
  
  declare module '@/components/ui/textarea' {
    export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
  }
  
  declare module '@/components/ui/input' {
    export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  }
  
  declare module '@/components/ui/slider' {
    export const Slider: React.FC<{
      value: number[];
      onValueChange: (value: number[]) => void;
      min: number;
      max: number;
      step: number;
    }>;
  }
  
  declare module '@/components/ui/progress' {
    export const Progress: React.FC<{
      value: number;
    }>;
  }