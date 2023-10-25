import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");

  const [mensaje, setMensaje] = useState("");
  const handleApiCall = async (values) => {
    try {
      const email_admin = values.email;
      const password = values.password;
      const sqlQuery = { email_admin, password };
      // Realiza la solicitud a la API de Node.js
      const queryData = { sqlQuery };

      const apiUrl = "https://2be4-186-4-2-178.ngrok-free.app/Api/V2/authenticated";

      // const response = await axios.post(apiUrl, queryData);
      // const responseData = response.data;
      const requestOptions = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(queryData),
      };

      let response;

      do {
        response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          await new Promise((resolve) => setTimeout(resolve, 40000));
        }
      } while (!response.ok);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.statusCode == 200) {
        const admin_acceso = responseData.result[0];
        const adminData = {
          id_acceso: admin_acceso.id_admin,

          token_acceso: admin_acceso.token_admin,

          name_acceso: admin_acceso.name_admin,

          email_acceso: admin_acceso.email_admin,

          NetsuiteId_acceso: admin_acceso.idnetsuite_admin,

          pass_admin_va: admin_acceso.pass_admin,

          token_exp_va: admin_acceso.token_exp_admin,

          rol_va: admin_acceso.id_rol_admin,
        };
        sessionStorage.removeItem("admin");
        sessionStorage.setItem("admin", JSON.stringify(adminData));
        handleSkip("/");
      }

      if (responseData.statusCode == 500) {
        setMensaje(responseData.error.results);
      }
      // Guardar el nuevo objeto en sessionStorage
      //aqui cre la sesion del admin

      // return responseData;

      // Maneja la respuesta de la API aquí
      // console.log("Respuesta de la API", response);
      // Puedes realizar redirecciones o actualizar el estado del componente según la respuesta
    } catch (error) {
      // Maneja los errores de la API aquí
      console.error("Error al llamar a la API:", error);
    }
  };

  /* crear una instancia de Formik. */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Debe ser un email valido").required("Campo requerido").max(255),
      password: Yup.string().max(255).required("Contraseña requerida"),
    }),

    /* La función `onSubmit` es una función asincrónica que se llama cuando se envía el formulario. Es
responsable de manejar la lógica de envío del formulario, incluido el inicio de sesión del usuario y
su redirección a la página de inicio si el inicio de sesión se realiza correctamente. */
    onSubmit: async (values, helpers) => {
      try {
        await handleApiCall(values);
        await auth.signIn(values.email_admin, values.password);
        const storedAdminData = JSON.parse(sessionStorage.getItem("admin"));
        console.log(email_admin);
        if (storedAdminData) {
          router.push("/");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  /* Cuando hay más de un Tab de autenticación evita la renderización de ambos componentes unicamente
renderiza la vista sobre la que estamos o seleccionamos Se necesitan dos parámetros: "evento" y "valor". */
  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>CRM Hotel</title>
      </Head>

      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h2">CRM Hotel</Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email de usuario Rocca" value="email" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="correo@roccacr.com"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Contraseña"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {mensaje}
                </Typography>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
