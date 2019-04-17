import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {SuperuserConfigurationComponent} from './superuser-configuration/superuser-configuration.component';
import {ParkingDetailComponent} from './parking-detail/parking-detail.component';
import {ClientsComponent} from './clients/clients.component';
import {ProviderListComponent} from './superuser-configuration/providers/provider-list/provider-list.component';
import {LoginComponent} from './auth/login/login.component';
import {ProviderDetailComponent} from './superuser-configuration/providers/provider-detail/provider-detail.component';
import {ManagerParkingConfigureComponent} from './manager/manager-parking-configure/manager-parking-configure.component';
import {ClientDetailComponent} from './clients/client-detail/client-detail.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AddProviderComponent} from './superuser-configuration/providers/add-provider/add-provider.component';
import {ClientEditComponent} from './clients/client-edit/client-edit.component';
import {UpdateProviderComponent} from './superuser-configuration/providers/update-provider/update-provider.component';
import {ManagerParkingListComponent} from './manager/manager-parking-list/manager-parking-list.component';
import {ClientProfileComponent} from "./client-profile/client-profile.component";
import {ClientProfileEditComponent} from "./client-profile/client-profile-edit/client-profile-edit.component";
import {ClientProfileEditPasswordComponent} from "./client-profile/client-profile-edit-password/client-profile-edit-password.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {ParkingStatisticComponent} from "./statistic/parking-statistic/parking-statistic.component";
import {SpotstatisticComponent} from "./statistic/spotstatistic/spotstatistic.component";
import {NonFoundComponent} from "./errors/non-found/non-found.component";
import {InternalServerErrorComponent} from "./errors/internal-server-error/internal-server-error.component";
import {ForbiddenComponent} from "./errors/forbidden/forbidden.component";
import {ClientPasswordChangeConfirmationComponent} from './client-profile/client-password-change-confirmation/client-password-change-confirmation.component';
import {RegistarationConfirmationComponent} from './auth/registration/registaration-confirmation/registaration-confirmation.component';
import {ManagerSpotListComponent} from "./manager/manager-spot-list/manager-spot-list.component";
import {AuthGuard} from "./auth/guards/auth-guard.service";
import {ProviderGuard} from "./auth/guards/provider-guard.service";
import {DriverGuard} from "./auth/guards/driver-guard.service";
import {ForgetPasswordComponent} from './auth/forget-password/forget-password.component';

const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {
        path: 'auth',
        canActivate: [AuthGuard],
        children: [
            {path: 'forget/password', component: ForgetPasswordComponent},
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegistrationComponent}
        ]
    },
    {
        path: 'configuration',
        canActivate: [ProviderGuard],
        children: [
            {path: '', component: SuperuserConfigurationComponent},
            {
                path: 'clients',
                children: [
                    {path: '', component: ClientsComponent},
                    {path: ':id', component: ClientDetailComponent},
                    {path: ':id/edit/:id', component: ClientDetailComponent},
                    {path: 'edit/:id', component: ClientEditComponent}
                ]
            },
            {
                path: 'providers',
                children: [
                    {path: '', component: ProviderListComponent},
                    {path: ':id', component: ProviderDetailComponent}
                ]
            },
            {
                path: 'provider',
                children: [
                    {path: '', component: ProviderListComponent},
                    {path: 'add', component: AddProviderComponent},
                    {path: 'update/:id', component: UpdateProviderComponent}
                ]
            }
        ]
    },
    {
        path: 'profile',
        canActivate: [DriverGuard],
        children: [
            {path: '', component: ClientProfileComponent},
            {path: 'edit', component: ClientProfileEditComponent},
            {path: 'edit/password', component: ClientProfileEditPasswordComponent}

        ]
    },
    {
        path: 'statistic',
        children: [
            {path: '', component: StatisticComponent},
            {
                path: 'parkingstatistic',
                children: [
                    {path: '', component: ParkingStatisticComponent},
                    {path: 'parkingdetail/:id', component: ParkingDetailComponent}

                ]
            }
        ]
    },
    {
        path: 'manager-configuration',
        canActivate: [ProviderGuard],
        children: [
            {
                path: ':id/spots',
                children: [
                    {
                        path: '', component: ManagerSpotListComponent
                    }
                ]
            },
            {
                path: 'parkings',
                canActivate: [ProviderGuard],
                children: [
                    {path: '', component: ManagerParkingListComponent},
                    {
                        path: ':configureType',
                        component: ManagerParkingConfigureComponent
                    },
                    {
                        path: ':configureType/:id',
                        component: ManagerParkingConfigureComponent
                    }
                ]
            },
        ]
    },
    {
        path: 'parkingdetail',
        children: [
            {path: ':id', component: ParkingDetailComponent},
            {path: ':id/spotstatistic', component: SpotstatisticComponent}
        ]
    },
    {
        path: 'error',
        children: [
            {path: 'non-found', component: NonFoundComponent},
            {path: 'server-error', component: InternalServerErrorComponent},
            {path: 'forbidden', component: ForbiddenComponent}
        ]
    },
    {path: 'update/password/:uuid', component: ClientPasswordChangeConfirmationComponent},
    {path: 'activate/:uuid', component: RegistarationConfirmationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}