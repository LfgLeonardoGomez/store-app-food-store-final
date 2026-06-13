import { Controller, useForm } from "react-hook-form";
import type { DireccionEntrega, DireccionEntregaCreate } from "../types/types";
import { Input } from "../../../shared/components/ui/Input";


type DireccionesFormProps = {
    initialData?: DireccionEntrega
    onSubmit: (data: DireccionEntregaCreate) => void
    isLoading?: boolean;
    onCancel?: ()=> void
}


export function DireccionesForm({initialData, onSubmit, isLoading, onCancel}: DireccionesFormProps) {

    const defaultValues = initialData ? {
        alias: initialData.alias,
        linea_1: initialData.linea_1,
        linea_2: initialData.linea_2,
        ciudad: initialData.ciudad,
        provincia: initialData.provincia,
        codigo_postal: initialData.codigo_postal,
        es_principal: initialData.es_principal,
        }
    : {
        alias: "",
        linea_1: "",
        linea_2: "",
        ciudad: "",
        provincia: "",
        codigo_postal: "",
        es_principal: false,
        };

    const {register, handleSubmit, control} = useForm<DireccionEntregaCreate>({
        defaultValues,
    });

        return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Alias */}
    <Controller
        name="alias"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
            <Input
                label="Alias"
                placeholder="Mi casa, trabajo, etc."
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error ? "El alias es obligatorio" : undefined}
            />
            )}
        />

        {/* Línea 1 */}
        <Controller
            name="linea_1"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
            <Input
                label="Dirección"
                placeholder="Calle y número"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error ? "La dirección es obligatoria" : undefined}
            />
            )}
        />

        {/* Línea 2 */}
        <Controller
            name="linea_2"
            control={control}
            render={({ field }) => (
            <Input
                label="Piso / Dpto / Referencia"
                placeholder="Opcional"
                value={field.value}
                onChange={field.onChange}
            />
            )}
        />

        {/* Ciudad + Provincia en una fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
            name="ciudad"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
                <Input
                label="Ciudad"
                placeholder="Ciudad"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error ? "Obligatorio" : undefined}
                />
            )}
            />

            <Controller
            name="provincia"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
                <Input
                label="Provincia"
                placeholder="Provincia"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error ? "Obligatorio" : undefined}
                />
            )}
            />
        </div>

      {/* Código Postal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
            name="codigo_postal"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
            <Input
                label="Código Postal"
                placeholder="1000"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error ? "El código postal es obligatorio" : undefined}
            />
            )}
        />

        <div className="flex items-center gap-2 pt-6">
            <input
            type="checkbox"
            {...register("es_principal")}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-primary">Dirección principal</span>
        </div>
        </div>

      {/* Botones */}
        <div className="flex gap-3 pt-2">
        <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
            {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Guardar"}
        </button>

        {onCancel && (
            <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 border border-border rounded-lg text-text-secondary hover:bg-surface transition-colors"
            >
            Cancelar
            </button>
        )}
        </div>
    </form>
    );
}