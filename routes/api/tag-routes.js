const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  try {
    // find all tags
		const allTags = await Tag.findAll({
      // be sure to include its associated Product data
			include: [{ model: Product }]
		});
	
		res.status(200).json(allTags);
	
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
		const idTag = await Tag.findByPk(req.params.id, { include: [{ model: Product }], });
	
		if (!idTag) {
			res.status(404).json( { message: "Tag Not Found"} );
			return;
		}
	
		res.status(200).json(idTag);
	
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
