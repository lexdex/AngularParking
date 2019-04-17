import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AgmDirectionModule} from 'agm-direction';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {AppNavbarHeaderComponent} from './app-navbar-header/app-navbar-header.component';
import {ParkingListComponent} from './index/parking-list/parking-list.component';
import {ParkingService} from './parking.service';
import {ManagerParkingService} from './manager/manager-parking.service';
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedinLoginProvider,
    SocialLoginModule
} from 'angular5-social-auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SuperuserConfigurationComponent} from './superuser-configuration/superuser-configuration.component';
import {ParkingDetailComponent} from './parking-detail/parking-detail.component';
import {ProviderService} from './superuser-configuration/providers/provider.service';
import {ClientsComponent} from './clients/clients.component';
import {ClientListComponent} from './clients/client-list/client-list.component';
import {ClientEditComponent} from './clients/client-edit/client-edit.component';
import {ClientService} from './clients/client.service';
import {ClientItemComponent} from './clients/client-list/client-item/client-item.component';
import {ProviderListComponent} from './superuser-configuration/providers/provider-list/provider-list.component';
import {ProviderDetailComponent} from './superuser-configuration/providers/provider-detail/provider-detail.component';
import {AddProviderComponent} from './superuser-configuration/providers/add-provider/add-provider.component';
import {FilterPipe} from './clients/client-list/filter.pipe';
import {ClientDetailComponent} from './clients/client-detail/client-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AngularMaterialsModule} from './angular-materials.module';
import {IndexComponent} from './index/index.component';
import {ParkingListFilterComponent} from './index/parking-list-filter/parking-list-filter.component';
import {ManagerParkingConfigureComponent} from './manager/manager-parking-configure/manager-parking-configure.component';
import {ManagerParkingListComponent} from './manager/manager-parking-list/manager-parking-list.component';

import {TranslateModule} from '@ngx-translate/core';
import {AgmCoreModule} from '@agm/core';
import {TokenStorage} from './auth/token/token-storage';
import {LocationFieldComponent} from './index/parking-list-filter/location-field/location-field.component';
import {IpLocationService} from './service/ip-location.service';
import {RadiusFieldComponent} from './index/parking-list-filter/radius-field/radius-field.component';
import {MatSliderModule} from '@angular/material/slider';
import {PriceRangeFieldComponent} from './index/parking-list-filter/price-range-field/price-range-field.component';
import {UpdateProviderComponent} from './superuser-configuration/providers/update-provider/update-provider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PagerService} from './_services/pager.service';
import {MatRadioModule} from '@angular/material/radio';
import {DeleteConfirmationDialogComponent} from './manager/manager-parking-list/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {ClientProfileComponent} from './client-profile/client-profile.component';
import {ClientProfileEditComponent} from './client-profile/client-profile-edit/client-profile-edit.component';
import {ClientProfileEditPasswordComponent} from './client-profile/client-profile-edit-password/client-profile-edit-password.component';
import {FavoritesAddConfigmDialogComponent} from './parking-detail/favorites-add-configm-dialog/favorites-add-configm-dialog.component';
import {ParkingMapComponent} from './index/parking-map/parking-map.component';
import {StatisticComponent} from './statistic/statistic.component';
import {ParkingStatisticComponent} from './statistic/parking-statistic/parking-statistic.component';
import {SpotstatisticComponent} from './statistic/spotstatistic/spotstatistic.component';
import {StatisticsService} from './statistic/statistics.service';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ClientPasswordChangeConfirmationComponent} from './client-profile/client-password-change-confirmation/client-password-change-confirmation.component';
import {CustomAuthService} from './auth/custom-auth.service';
import {NonFoundComponent} from './errors/non-found/non-found.component';
import {InternalServerErrorComponent} from './errors/internal-server-error/internal-server-error.component';
import {ForbiddenComponent} from './errors/forbidden/forbidden.component';
import {httpInterceptorProviders} from './interceptors/http-interceptors';
import {RegistarationConfirmationComponent} from '../app/auth/registration/registaration-confirmation/registaration-confirmation.component';
import {SidenavComponent} from './index/sidenav/sidenav.component';
import {DataserviceService} from './index/dataservice.service';
import {ManagerSpotListComponent} from './manager/manager-spot-list/manager-spot-list.component';
import {ManagerSpotService} from './manager/manager-spot.service';
import {SpotAddDialogComponent} from './manager/manager-spot-list/spot-add-dialog/spot-add-dialog.component';
import {AuthGuard} from './auth/guards/auth-guard.service';
import {AdminGuard} from './auth/guards/admin-guard.service';
import {ProviderGuard} from './auth/guards/provider-guard.service';
import {DriverGuard} from './auth/guards/driver-guard.service';
import {ForgetPasswordComponent} from './auth/forget-password/forget-password.component';
import {ChargerCheckboxComponent} from './index/parking-list-filter/charger-checkbox/charger-checkbox.component';
import {SharedServiceService} from './index/shared-service.service';
import {DistanceService} from './index/distance.service';
import {FavoriteCheckboxComponent} from './index/parking-list-filter/favorite-checkbox/favorite-checkbox.component';

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('372788403197318')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('678627060844-6o8k48ni9re5u397309k27a9j35egi76.apps.googleusercontent.com')
            },
            {
                id: LinkedinLoginProvider.PROVIDER_ID,
                provider: new LinkedinLoginProvider('865znc216bg618')
            },
        ]
    );
    return config;
}

@NgModule({
    declarations: [
        IndexComponent,
        AppComponent,
        AppNavbarHeaderComponent,
        ParkingListComponent,
        SuperuserConfigurationComponent,
        ParkingDetailComponent,
        SuperuserConfigurationComponent,
        ClientsComponent,
        ClientListComponent,
        ClientEditComponent,
        ClientItemComponent,
        ProviderListComponent,
        LoginComponent,
        RegistrationComponent,
        ProviderDetailComponent,
        ParkingListFilterComponent,
        ManagerParkingConfigureComponent,
        ManagerParkingListComponent,
        AddProviderComponent,
        FilterPipe,
        ClientDetailComponent,
        LocationFieldComponent,
        RadiusFieldComponent,
        PriceRangeFieldComponent,
        UpdateProviderComponent,
        ParkingMapComponent,
        DeleteConfirmationDialogComponent,
        ClientProfileComponent,
        ClientProfileEditComponent,
        ClientProfileEditPasswordComponent,
        FavoritesAddConfigmDialogComponent,
        StatisticComponent,
        ParkingStatisticComponent,
        SpotstatisticComponent,
        NonFoundComponent,
        InternalServerErrorComponent,
        ForbiddenComponent,
        SpotstatisticComponent,
        ClientPasswordChangeConfirmationComponent,
        ParkingMapComponent,
        RegistarationConfirmationComponent,
        SidenavComponent,
        ManagerSpotListComponent,
        SpotAddDialogComponent,
        ForgetPasswordComponent,
        ChargerCheckboxComponent,
        FavoriteCheckboxComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAufS5bcmpO5UiWxG_MpcSOrIiRNzbUJus',
            libraries: ['places']
        }),
        TranslateModule.forRoot(),
        AgmDirectionModule,
        HttpClientModule,
        BrowserModule,
        RouterModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialsModule,
        MatSelectModule,
        CommonModule,
        MatAutocompleteModule,
        AngularMaterialsModule,
        MatDividerModule,
        MatExpansionModule,
        MatButtonModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        BsDatepickerModule.forRoot(),
        SocialLoginModule,
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatChipsModule
    ],
    entryComponents: [DeleteConfirmationDialogComponent, FavoritesAddConfigmDialogComponent, SpotAddDialogComponent],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        },
        httpInterceptorProviders,
        ParkingService,
        ManagerParkingService,
        ProviderService,
        ClientService,
        IpLocationService,
        PagerService,
        TokenStorage,
        PagerService,
        StatisticsService,
        CustomAuthService,
        DataserviceService,
        ManagerSpotService,
        AuthGuard,
        AdminGuard,
        ProviderGuard,
        DriverGuard,
        SharedServiceService,
        DistanceService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
