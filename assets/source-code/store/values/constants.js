let userAgent = window.navigator.userAgent;
let isEdge = userAgent.indexOf('Edge') !== -1;
let isIE = userAgent.indexOf('Trident') !== -1;


export default {

  namespace: 'constants',


  storage: {
    isIE,
    isEdge,
    mobileLimit: 768,
    folderDefColor: 'yellow:600',
    topRowHeight: 64,
    subtopRowHeight: 48,
    leftColumnMobileLimit: 768,
    rightColumnMobileLimit: 1280,
    explorerPadding: 16,
    explorerScrollWidth: isIE ? 18 : (isEdge ? 16 : 8),
    explorerMaxSizes: {
      huge: 150,
      large: 126,
      medium: 102,
      small: 78,
    },
    explorerEntityMargins: {
      huge: 8,
      large: 6,
      medium: 4,
      small: 2,
    },
    explorerEntityPadding: {
      huge: 10,
      large: 8,
      medium: 6,
      small: 4,
    },
    explorerInitials: {
      huge: 56,
      large: 90,
      medium: 132,
      small: 210,
    },
    explorerIncrements: {
      huge: 28,
      large: 45,
      medium: 66,
      small: 105,
    },
  },

};
