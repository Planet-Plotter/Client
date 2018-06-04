

__HEROKU_DATABASE_URL__ = 'https://exoplanet-plotter.herokuapp.com';

__API_URL__ = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec,st_teff,pl_orbper,st_dist,pl_pnum,pl_masse,pl_rade,pl_disc,pl_telescope,pl_mnum,pl_pelink,st_spstr,st_age,&order=st_dist&format=JSON';

Planet.databaseUpdate = () => {
  $.get(`${__API_URL__}/`)
    .then(Book.loadAll)
    .then(next)
    .catch(errorCallback);
};

Planet.databaseUpdate = () => {
  $.get(`${__API_URL__}/`)
    .then(Book.loadAll)
    .then(next)
    .catch(errorCallback);
};



// ALL DATA LINK
//https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec,st_teff,pl_orbper,st_dist,pl_pnum,pl_masse,pl_rade,pl_disc,pl_telescope,pl_mnum,pl_pelink,st_spstr,st_age,&order=st_dist&format=JSON

// 2018 ONLY
// https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec,st_teff,pl_orbper,st_dist,pl_pnum,pl_masse,pl_rade,pl_disc,pl_telescope,pl_name,pl_mnum,pl_pelink,st_spstr,st_age,&where=pl_disc%3E2017&order=pl_disc&format=JSON&select=count(*)
