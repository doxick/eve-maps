import React from 'react'
import { Route } from 'redux-router'
import * as Patterns from './patterns'
import * as Pages from 'app/containers/pages'
import withUser from 'app/utils/containers/with-user'

export default withUser(({ user }) => (
  <React.Fragment>
    <Route pattern={Patterns.Homepage} component={Pages.Homepage} />
    <Route pattern={Patterns.CategoryOverviewPage} component={Pages.CategoryOverviewPage} />
    <Route pattern={Patterns.EmergencyJob} component={Pages.EmergencyJob} />
    <Route pattern={Patterns.JobOverview} component={Pages.JobOverview} />
    <Route pattern={Patterns.CategoryDetailPage} component={Pages.CategoryDetailPage} />
    <Route pattern={Patterns.Premium} component={Pages.Premium} />
    <Route pattern={Patterns.Colofon} component={Pages.Colofon} />
    <Route pattern={Patterns.Faq} component={Pages.Faq} />
    <Route pattern={Patterns.Contact} component={Pages.Contact} />
    <Route pattern={Patterns.ContactConfirmation} component={Pages.ContactConfirmation} />
    {user
      ? (
        <React.Fragment>
          <Route pattern={Patterns.DashboardOverview} component={Pages.DashboardOverview} />
          <Route pattern={Patterns.DashboardOverviewDetail} component={Pages.DashboardOverviewDetail} />
          <Route pattern={Patterns.DashboardPayment} component={Pages.DashboardPayment} />
          <Route pattern={Patterns.DashboardPremium} component={Pages.DashboardPremium} />
          <Route pattern={Patterns.DashboardProfile} component={Pages.DashboardProfile} />
          <Route pattern={Patterns.DashboardLogout} component={Pages.DashboardLogout} />
        </React.Fragment>
      )
      : (
        <React.Fragment>
          <Route pattern={Patterns.LoginPage} component={Pages.LoginPage} />
          <Route pattern={Patterns.CreateAccountPage} component={Pages.CreateAccountPage} />
          <Route pattern={Patterns.CreateAccountConfirmationPage} component={Pages.CreateAccountConfirmationPage} />
          <Route pattern={Patterns.ForgotPasswordPage} component={Pages.ForgotPasswordPage} />
          <Route pattern={Patterns.ResetPasswordPage} component={Pages.ResetPasswordPage} />
          <Route pattern={Patterns.ResetPasswordConfirmationPage} component={Pages.ResetPasswordConfirmationPage} />
          <Route pattern={Patterns.ForgotPasswordConfirmationPage} component={Pages.ForgotPasswordConfirmationPage} />
          <Route pattern={Patterns.VerifyAccountPage} component={Pages.VerifyAccountPage} />
        </React.Fragment>
      )
    }
  </React.Fragment>
))
