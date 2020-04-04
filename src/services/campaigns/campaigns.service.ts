// Initializes the `campaigns` service on path `/campaigns`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Campaigns } from './campaigns.class';
import createModel from '../../models/campaigns.model';
import hooks from './campaigns.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'campaigns': Campaigns & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/campaigns', new Campaigns(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('campaigns');

  service.hooks(hooks);
}
