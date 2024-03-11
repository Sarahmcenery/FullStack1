export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Placemarks",
        };
        return h.view("about-view", viewData);
      },
    },
  };