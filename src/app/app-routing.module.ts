import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', 
                component: AppMainComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                        import('../app/shared/shared.module').then(
                            (m) => m.SharedModules
                        ),
                    },
                    
                ],
            },
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
            
        ], 
        {
            scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules
        }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
