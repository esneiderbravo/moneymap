/**
 * Set states
 */
const setAuthData = (authData) => ({
  type: "setAuthData",
  payload: {
    authData,
  },
});

const setReferralPartnerData = (referralPartnerData) => ({
  type: "setReferralPartnerData",
  payload: {
    referralPartnerData,
  },
});

const setNavigationData = (navigationData) => ({
  type: "setNavigationData",
  payload: {
    navigationData,
  },
});

const setCampaignNavigationData = (campaignNavigationData) => ({
  type: "setCampaignNavigationData",
  payload: {
    campaignNavigationData,
  },
});

const setFormData = (formData) => ({
  type: "setFormData",
  payload: {
    formData,
  },
});

const setFilters = (filters) => ({
  type: "setFilters",
  payload: {
    filters,
  },
});

const setCampaignProcess = (campaignProcessData) => ({
  type: "setCampaignProcess",
  payload: {
    campaignProcessData,
  },
});

export {
  setAuthData,
  setReferralPartnerData,
  setNavigationData,
  setFormData,
  setCampaignNavigationData,
  setFilters,
  setCampaignProcess,
};
