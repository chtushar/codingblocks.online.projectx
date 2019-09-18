import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import { getSeoSchemaForAllCourses } from 'codingblocks-online/utils/seo'
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
    // Don't wait for any api request, everything is lazy loaded on the home page
  headData: service(),
  currentUser: service(),
  session: service(),
  beforeModel () {
    this._super(...arguments)

    if(this.get('currentUser.organization')) {
      this.transitionTo(this.get('currentUser.organization'))
    }

    if (!this.session.isAuthenticated)
      return ;

    const redirectionPathExternal = localStorage.getItem('redirectionPathExternal')
      if (redirectionPathExternal) {
        // consume this redirect
        localStorage.removeItem('redirectionPathExternal')
        return window.location.href = redirectionPathExternal
      }

      const redirectionPath =  localStorage.getItem('redirectionPath')
      
      if (!redirectionPath) {
        localStorage.removeItem('redirectionPath')
        this.transitionTo(redirectionPath)
      }

  }

});
