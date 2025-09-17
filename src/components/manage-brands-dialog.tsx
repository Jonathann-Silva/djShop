
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getBrands, removeBrand, addBrand } from "@/lib/actions";
import { Trash2, Loader2, PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ManageBrandsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBrandsUpdated: () => void;
}

export function ManageBrandsDialog({ open, onOpenChange, onBrandsUpdated }: ManageBrandsDialogProps) {
    const [brands, setBrands] = useState<string[]>([]);
    const [newBrand, setNewBrand] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [removingBrand, setRemovingBrand] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (open) {
            fetchBrands();
        }
    }, [open]);

    const fetchBrands = async () => {
        setLoading(true);
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
        setLoading(false);
    };

    const handleAddBrand = async () => {
        if (!newBrand.trim()) {
            toast({ variant: "destructive", title: "Erro", description: "O nome da marca não pode estar vazio." });
            return;
        }
        
        setIsSaving(true);
        const result = await addBrand(newBrand.trim());
        if (result.success) {
            toast({ title: "Marca Adicionada", description: result.message });
            setNewBrand("");
            await fetchBrands();
            onBrandsUpdated();
        } else {
            toast({ variant: "destructive", title: "Erro ao Adicionar", description: result.message });
        }
        setIsSaving(false);
    };

    const handleRemoveBrand = async (brandToRemove: string) => {
        setRemovingBrand(brandToRemove);
        const result = await removeBrand(brandToRemove);
        if (result.success) {
            toast({ title: "Marca Removida", description: result.message });
            await fetchBrands(); // Refresh list
            onBrandsUpdated(); // Refresh parent component
        } else {
            toast({ variant: "destructive", title: "Erro ao Remover", description: result.message });
        }
        setRemovingBrand(null);
    };
    
    const handleClose = () => {
        if (!isSaving && !removingBrand) {
            onOpenChange(false);
        }
    }


  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerir Marcas</DialogTitle>
            <DialogDescription>
                Adicione ou remova marcas. Marcas em uso não podem ser removidas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
                <Input 
                    value={newBrand} 
                    onChange={(e) => setNewBrand(e.target.value)} 
                    placeholder="Nome da nova marca"
                    disabled={isSaving}
                />
                <Button onClick={handleAddBrand} disabled={isSaving || !newBrand.trim()}>
                    {isSaving ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                    <span className="ml-2">Adicionar</span>
                </Button>
            </div>
            
            <ScrollArea className="h-64 border rounded-md">
                <div className="p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div>
                ) : brands.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground">Nenhuma marca encontrada.</p>
                ) : (
                    <ul className="space-y-2">
                        {brands.map(brand => (
                            <li key={brand} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                <span className="text-sm font-medium">{brand}</span>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => handleRemoveBrand(brand)}
                                    disabled={removingBrand === brand}
                                >
                                    {removingBrand === brand ? <Loader2 className="animate-spin" /> : <Trash2 size={16} />}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            </ScrollArea>
          </div>
           <DialogFooter>
                <Button variant="outline" onClick={handleClose}>Fechar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
