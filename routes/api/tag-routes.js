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
			return res.status(404).json( { message: "Tag Not Found"} );
			}	
		res.status(200).json(idTag);	
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
		const newTag = await Tag.create(req.body);
		res.status(200).json(newTag);	
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
		const updateTag = await Tag.update(
			{tag_name: req.body.tag_name},{where: {id: req.params.id,}},);	
		if (!updateTag[0]) {
			return res.status(404).json({message: "Tag Not Found"});			
		}	
		res.status(200).json({message: "Tag Updated"});	
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
		const delTag = await Tag.destroy({
			where: {id: req.params.id},
		});	
		if (!delTag) {
			return res.status(404).json({message: "Tag Not Found"});
		}	
		res.status(200).json({message: `Tag Deleted`});	
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
