import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterEvent } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule, MatTooltipModule, MatCardModule, MatSnackBarModule,
  MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressBarModule,
  MatSidenavModule, MatSlideToggleModule, MatDividerModule, MatExpansionModule,
  MatSortModule, MatPaginator } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './app-shell/header/header.component';
import { LogoComponent } from './app-shell/logo/logo.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssuesStore } from './store/issues';
import { IssuesService } from './services/issues/issues.service';
import { UiStateStore } from './store/ui-state';
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users/users.service';
import { UsersStore } from './store/users';
import { DebounceObsInputComponent } from './components/debounce-obs-input/debounce-obs-input.component';
import { CacheService } from './services/cache.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LogoComponent,
    IssuesComponent,
    UsersComponent,
    DebounceObsInputComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSortModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      // routes
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        data: { animation: 'dashboard', title: 'Dashboard', icon: 'dashboard' }
      },
      {
        path: 'issues',
        pathMatch: 'full',
        component: IssuesComponent,
        data: { animation: 'issues', title: 'Issues', icon: 'insert_chart' }
      },
      {
        path: 'users',
        pathMatch: 'full',
        component: UsersComponent,
        data: { animation: 'users', title: 'Users', icon: 'account_circle' }
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        data: { animation: 'login', title: 'login', icon: 'fingerprint' }
      }
    ], { useHash: false }),
  ],
  providers: [
    BrowserAnimationsModule,
    IssuesService,
    UsersService,
    IssuesStore,
    UiStateStore,
    UsersStore,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
