

const PINS_PER_PAGE = 50;

/**
 * Śervice to interact with Pinterest API
 */
class PinterestService {

  constructor(client) {
    this.client = client;
  }

  /**
   * Returns the information of a Pinterest board.
   * @param {string} boardId The pinterest board id.
   * @returns {Promise}
   */
  async getBoard(boardId) {

    try {

      const response = await this.client.api(`boards/${boardId}`);

      return response.data;

    } catch (e) {
      throw e;
    }
  }

  /**
   * Returns a list of Pins for an Album.
   * @param {string} boardId The id of the Pinterest album.
   * @returns {Promise}
   */
  async getPins(boardId, cursor) {

    try {

      const options = {
        qs: {
          fields: 'id,image,note,url,created_at',
          limit: PINS_PER_PAGE
        }
      };

      if (cursor) {
        options.qs.cursor = cursor;
      }

      const result = await this.client.api(`boards/${boardId}/pins`, options);

      const pins = result.data.map(item => ({
        id: item.id,
        description: item.note,
        imageUrl: item.image.original.url,
        pinUrl: item.url,
        created: new Date(item.created_at)
      }));

      return {
        items: pins,
        cursor: result.page.cursor
      };

    } catch (e) {
      throw new Error(e);
    }
  }
}


module.exports = PinterestService;
