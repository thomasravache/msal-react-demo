import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { WelcomeName } from "./WelcomeName";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { Link as RouterLink } from "react-router-dom";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    const getTokenWebApiAspnet = async () => {

        // pegar token e armazenar em variavel
        const takeToken = async () => new Promise((resolve, reject) => {
            instance.acquireTokenSilent({
                scopes: ['api://9145361a-6794-4612-aeb1-74ed5ffa3319/api.scope'],
            })
                .then((response) => resolve(response.accessToken))
                .catch((error) => reject(error));
        });

        // opcao 2 para pegar o token
        instance.acquireTokenSilent({
            scopes: ['api://9145361a-6794-4612-aeb1-74ed5ffa3319/api.scope'],
        }).then(res => console.log(res.accessToken));

        const token = await takeToken();

        console.log(token);
    };

    return (
        <div sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>
                        <Link component={RouterLink} to="/" color="inherit" variant="h6">Microsoft identity platform</Link>
                    </Typography>
                    {isAuthenticated && <WelcomeName />}
                    <Button component={RouterLink} to="/profile" color="inherit">Profile</Button>
                    <Button onClick={getTokenWebApiAspnet} color="inherit">Pegar Token</Button>
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;