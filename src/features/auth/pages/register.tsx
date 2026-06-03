    import { Link, useNavigate } from "react-router-dom";
    import { useForm } from "react-hook-form";
    import { ArrowLeft, Loader2 } from "lucide-react";
    import { Button } from "../../../shared/components/ui/Button";
import { authService } from "../services/authService";
import { toast } from "sonner";

    type RegisterFormValues = {
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    password: string;
    };

    export default function RegisterPage() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>();

    const onSubmit = async (data: RegisterFormValues) => {
        console.log(data);
        try {
            await authService.register(data)
            toast.success("Cuenta creada correctamente")
            navigate("/login")
        } catch (err:any) {
            const msg = err?.response?.data?.detail || "No se pudo crear la cuenta"
            toast.error(msg)
        }
        
    };

    const inputClassName =
        "w-full border border-border rounded-lg px-4 py-2.5 bg-background text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

    const errorClassName = "text-sm text-danger";

    return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-6">
    <div className="w-full max-w-4xl bg-background rounded-card shadow-card p-8">
        <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">FoodStore</h1>
        <p className="text-text-secondary">Creá tu cuenta para continuar</p>
        </div>

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-8"
        >
        {/* Columna izquierda: inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-sm font-medium text-text-secondary">
                Nombre
            </label>
            <input
                id="nombre"
                placeholder="Tu nombre"
                className={inputClassName}
                {...register("nombre", {
                required: "El nombre es obligatorio",
                })}
            />
            {errors.nombre && <p className={errorClassName}>{errors.nombre.message}</p>}
            </div>

            {/* Apellido */}
            <div className="flex flex-col gap-1.5">
            <label htmlFor="apellido" className="text-sm font-medium text-text-secondary">
                Apellido
            </label>
            <input
                id="apellido"
                placeholder="Tu apellido"
                className={inputClassName}
                {...register("apellido", {
                required: "El apellido es obligatorio",
                })}
            />
            {errors.apellido && <p className={errorClassName}>{errors.apellido.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email
            </label>
            <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className={inputClassName}
                {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresá un email válido",
                },
                })}
            />
            {errors.email && <p className={errorClassName}>{errors.email.message}</p>}
            </div>

            {/* Celular */}
            <div className="flex flex-col gap-1.5">
            <label htmlFor="celular" className="text-sm font-medium text-text-secondary">
                Celular
            </label>
            <input
                id="celular"
                placeholder="Tu celular"
                className={inputClassName}
                {...register("celular", {
                required: "El celular es obligatorio",
                maxLength: {
                    value: 20,
                    message: "El celular no puede superar los 20 caracteres",
                },
                })}
            />
            {errors.celular && <p className={errorClassName}>{errors.celular.message}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                Contraseña
            </label>
            <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={inputClassName}
                {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                },
                maxLength: {
                    value: 72,
                    message: "La contraseña no puede superar los 72 caracteres",
                },
                })}
            />
            {errors.password && <p className={errorClassName}>{errors.password.message}</p>}
            </div>
        </div>

        {/* Columna derecha: acciones */}
        <div className="flex flex-col justify-between gap-6 md:border-l md:border-border md:pl-8">
            <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
                Casi listo
            </h2>
            <p className="text-sm text-text-secondary">
                Completá tus datos para crear tu cuenta y empezar a comprar en FoodStore.
            </p>
            </div>

            <div className="flex flex-col gap-4">
            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Registrando...
                </>
                ) : (
                "Registrarme"
                )}
            </Button>

            <div className="text-center">
                <span className="text-sm text-text-secondary">
                ¿Ya tenés una cuenta?{" "}
                </span>
                <Link
                to="/login"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                Iniciá sesión
                </Link>
            </div>

            <div className="pt-6 border-t border-border text-center">
                <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                >
                <ArrowLeft size={16} />
                Volver a la tienda
                </Link>
            </div>
            </div>
        </div>
        </form>
    </div>
    </div>
    );
    }

