import * as authentication from "@feathersjs/authentication";
import validateCampaignOwner from "../../hooks/validate-campaign-owner";
import getAllCampaignEntities from '../../hooks/get-all-campaign-entities';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt"), validateCampaignOwner()],
    find: [getAllCampaignEntities()],
    get: [getAllCampaignEntities()],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
