const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    // find all categories    
    Category.findAll({
      include: [
        {
          // be sure to include its associated Products
          model: Product,
        },
      ],
    })
    .then((categories) => {
      if(!categories) {
        return res.status(404).json({message: 'No categories found'});
      };
      res.status(200).json(categories);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try{
    // find one category by its `id` value
    Category.findByPk(req.params.id, 
      // be sure to include its associated Products
      {include: [ {model : Product}],})
      .then((idcategorie) => {
        if(!idcategorie) {
          return res.status(404).json({message: 'No categorie with this ID found'});
        };
        res.status(200).json(idcategorie);
      });

  }catch(error){
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const newCat = Category.create(req.body);
    if(!req.body.category_name) {
      return res.status(400).json({ message: "Bad Request" });
    } else {      
      res.status(200).json(newCat);
    };

  }catch(error){
    res.status(400).json(error);
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
		const putCat = Category.update(
			{
				category_name: req.body.category_name,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);	
		if (!putCat) {
			res.status(404).json({ message: "Invalid Category" });
			return;
		}else if(!req.body.category_name){
      return res.status(400).json({ message: "Bad Request" });
    }	
		res.status(200).json("Category updated");	
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
