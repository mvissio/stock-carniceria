import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// Toast
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

// Translation
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Rutas
import {AppRoutingModule} from './app.routes';

// Modulos
import {PagesModule} from './pages/pages.module';

// temporal
import {ReactiveFormsModule} from '@angular/forms';

// Servicios
import {ServiceModule} from './services/service.module';

// Guardas e interceptores
import {AuthGuard} from './guards/auth.guard';
import {GrantedAuthorityGuard} from './guards/granted-authority.guard';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {TimeoutInterceptor, DEFAULT_TIMEOUT} from './interceptors/timeout.interceptor';
// Componentes
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NopagefoundComponent} from './shared/nopagefound/nopagefound.component';
import {Router} from '@angular/router';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ReactiveFormsModule,
    ServiceModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(), // ToastrModule added
    PagesModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    GrantedAuthorityGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeoutInterceptor,
      multi: true
    },
    {
      provide: DEFAULT_TIMEOUT,
      useValue: 30000
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
