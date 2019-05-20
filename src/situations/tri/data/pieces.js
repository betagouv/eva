const scene = {
  largeur: 1008,
  hauteur: 566
};

const pieces = [
  { type: 'bonbon3', y: 430 / scene.hauteur * 100, x: 855 / scene.largeur * 100 },
  { type: 'bonbon6', y: 430 / scene.hauteur * 100, x: 301 / scene.largeur * 100 },

  { type: 'bonbon2', y: 433 / scene.hauteur * 100, x: 723 / scene.largeur * 100 },
  { type: 'bonbon6', y: 433 / scene.hauteur * 100, x: 335 / scene.largeur * 100 },
  { type: 'bonbon1', y: 433 / scene.hauteur * 100, x: 196 / scene.largeur * 100 },

  { type: 'bonbon8', y: 434 / scene.hauteur * 100, x: 688 / scene.largeur * 100 },
  { type: 'bonbon7', y: 435 / scene.hauteur * 100, x: 450 / scene.largeur * 100 },
  { type: 'bonbon7', y: 437 / scene.hauteur * 100, x: 474 / scene.largeur * 100 },
  { type: 'bonbon2', y: 439 / scene.hauteur * 100, x: 289 / scene.largeur * 100 },

  { type: 'bonbon2', y: 443 / scene.hauteur * 100, x: 706 / scene.largeur * 100 },
  { type: 'bonbon8', y: 443 / scene.hauteur * 100, x: 403 / scene.largeur * 100 },
  { type: 'bonbon11', y: 443 / scene.hauteur * 100, x: 243 / scene.largeur * 100 },

  { type: 'bonbon6', y: 445 / scene.hauteur * 100, x: 387 / scene.largeur * 100 },
  { type: 'bonbon9', y: 445 / scene.hauteur * 100, x: 231 / scene.largeur * 100 },

  { type: 'bonbon3', y: 447 / scene.hauteur * 100, x: 91 / scene.largeur * 100 },

  { type: 'bonbon12', y: 448 / scene.hauteur * 100, x: 501 / scene.largeur * 100 },
  { type: 'bonbon12', y: 448 / scene.hauteur * 100, x: 174 / scene.largeur * 100 },

  { type: 'bonbon10', y: 450 / scene.hauteur * 100, x: 638 / scene.largeur * 100 },
  { type: 'bonbon5', y: 450 / scene.hauteur * 100, x: 281 / scene.largeur * 100 },
  { type: 'bonbon10', y: 450 / scene.hauteur * 100, x: 255 / scene.largeur * 100 },
  { type: 'bonbon12', y: 450 / scene.hauteur * 100, x: 51 / scene.largeur * 100 },

  { type: 'bonbon9', y: 451 / scene.hauteur * 100, x: 832 / scene.largeur * 100 },
  { type: 'bonbon11', y: 451 / scene.hauteur * 100, x: 299 / scene.largeur * 100 },

  { type: 'bonbon5', y: 452 / scene.hauteur * 100, x: 457 / scene.largeur * 100 },
  { type: 'bonbon9', y: 453 / scene.hauteur * 100, x: 619 / scene.largeur * 100 },
  { type: 'bonbon10', y: 455 / scene.hauteur * 100, x: 140 / scene.largeur * 100 },

  { type: 'bonbon12', y: 456 / scene.hauteur * 100, x: 671 / scene.largeur * 100 },
  { type: 'bonbon3', y: 456 / scene.hauteur * 100, x: 346 / scene.largeur * 100 },

  { type: 'bonbon3', y: 458 / scene.hauteur * 100, x: 308 / scene.largeur * 100 },
  { type: 'bonbon10', y: 462 / scene.hauteur * 100, x: 303 / scene.largeur * 100 },
  { type: 'bonbon4', y: 463 / scene.hauteur * 100, x: 230 / scene.largeur * 100 },
  { type: 'bonbon2', y: 464 / scene.hauteur * 100, x: 453 / scene.largeur * 100 },
  { type: 'bonbon11', y: 466 / scene.hauteur * 100, x: 750 / scene.largeur * 100 },
  { type: 'bonbon4', y: 468 / scene.hauteur * 100, x: 404 / scene.largeur * 100 },
  { type: 'bonbon5', y: 469 / scene.hauteur * 100, x: 328 / scene.largeur * 100 },
  { type: 'bonbon7', y: 470 / scene.hauteur * 100, x: 751 / scene.largeur * 100 },

  { type: 'bonbon1', y: 471 / scene.hauteur * 100, x: 632 / scene.largeur * 100 },
  { type: 'bonbon9', y: 471 / scene.hauteur * 100, x: 605 / scene.largeur * 100 },
  { type: 'bonbon7', y: 471 / scene.hauteur * 100, x: 440 / scene.largeur * 100 },

  { type: 'bonbon5', y: 473 / scene.hauteur * 100, x: 654 / scene.largeur * 100 },

  { type: 'bonbon4', y: 474 / scene.hauteur * 100, x: 808 / scene.largeur * 100 },
  { type: 'bonbon11', y: 474 / scene.hauteur * 100, x: 402 / scene.largeur * 100 },

  { type: 'bonbon6', y: 475 / scene.hauteur * 100, x: 374 / scene.largeur * 100 },

  { type: 'bonbon8', y: 476 / scene.hauteur * 100, x: 713 / scene.largeur * 100 },
  { type: 'bonbon8', y: 476 / scene.hauteur * 100, x: 106 / scene.largeur * 100 },

  { type: 'bonbon1', y: 477 / scene.hauteur * 100, x: 795 / scene.largeur * 100 },
  { type: 'bonbon4', y: 477 / scene.hauteur * 100, x: 664 / scene.largeur * 100 },
  { type: 'bonbon1', y: 477 / scene.hauteur * 100, x: 316 / scene.largeur * 100 }
];

const bacs = [
  { categorie: 'bonbon10', x: 10.5, y: 4 },
  { categorie: 'bonbon6', x: 10.5, y: 31 },
  { categorie: 'bonbon11', x: 10.5, y: 57 },

  { categorie: 'bonbon4', x: 30, y: 4 },
  { categorie: 'bonbon9', x: 30, y: 31 },
  { categorie: 'bonbon8', x: 30, y: 57 },

  { categorie: 'bonbon7', x: 55, y: 4 },
  { categorie: 'bonbon3', x: 55, y: 31 },
  { categorie: 'bonbon1', x: 55, y: 57 },

  { categorie: 'bonbon5', x: 75, y: 4 },
  { categorie: 'bonbon12', x: 75, y: 31 },
  { categorie: 'bonbon2', x: 75, y: 57 }
];

export default { pieces, bacs };
