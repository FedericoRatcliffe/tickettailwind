import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'registro',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
