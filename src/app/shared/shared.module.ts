import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SharedRoutingModule } from "./shared-routing.module";
import {InputMaskModule} from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "./services/register.service";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import { MessageService } from "primeng/api";
import { StyleClassModule } from "primeng/styleclass";
import { ToggleButtonModule } from "primeng/togglebutton";
import { LoginService } from "./services/login.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { TagsComponent } from './tags/tags.component';
import { LastBlogsComponent } from './last-blogs/last-blogs.component';
import { LastAnswersComponent } from './last-answers/last-answers.component';
import { ContentService } from "./services/content.service";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        MenuComponent,
        SidebarComponent,
        ContentComponent,
        TagsComponent,
        LastBlogsComponent,
        LastAnswersComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        CheckboxModule,
        DividerModule,
        InputMaskModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressSpinnerModule,
        ToastModule,
        StyleClassModule,
        ToggleButtonModule,
        MessageModule,
        MessagesModule
    ],
    exports: [
        MenuComponent,
        ContentComponent,
        SidebarComponent,
        LoginComponent,
        RegisterComponent,
        TagsComponent,
        LastBlogsComponent,
        LastAnswersComponent
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
        
    ],
    providers: [
        RegisterService, MessageService, LoginService, JwtHelperService, CookieService, ContentService
    ]
})
export class SharedModules {}