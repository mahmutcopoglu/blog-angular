import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', 
                component: AppComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                        import('../app/shared/shared.module').then(
                            (m) => m.SharedModule
                        ),
                    },
                    
                ],
            },
            
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
