
const addMediaComp = Vue.component('mediaItems', {
  mounted: function () {
    axios('/media')
    .then((resp) => {
      this.mediaItems = resp.data;
    });

    this.$on('addMedia', (media) => {
      axios.post('/media', {
        UsageClass: media.UsageClass,
        CheckoutType: media.CheckoutType,
        MaterialType: media.MaterialType, 
        CheckoutYear: media.CheckoutYear, 
        Checkouts: media.Checkouts, 
        Title: media.Title, 
        Creator: media.Creator, 
        Subjects: media.Subjects, 
        Publisher: media.Publisher, 
        PublicationYear: media.PublicationYear
      }).then(() => {
        this.mediaItems.push(media);
      });
    });
  },
  data: function () {
    return {
      mediaItems: []
    };
  },
  template: ` <article><add-media></add-media> </article>`
});


Vue.component('add-media', {
  data: function () {
    return {
      media: {
        UsageClass: '',
        CheckoutType: '',
        MaterialType: '', 
        CheckoutYear: '', 
        Checkouts: '', 
        Title: '', 
        Creator: '', 
        Subjects: '', 
        Publisher: '', 
        PublicationYear: '',
        name: ''
      }
    };
  },
  methods: {
    addMedia: function () {
      this.$parent.$emit('addMedia', this.media);
    }
  },
  template: `
      <section class="card m-5">
        <div class="card-header">
          <h6>  Add media: </h6>
        </div>
        <div class="card-body">

          <div class="form-group">
            <label for="input-title">
              Title
            </label>
            <input  v-model="media.Title" class="form-control" id="input-name" placeholder="Star Wars, Lord of The Rings...">
          </div>

          <div class="form-group">
            <label for="input-title">
              Creator
            </label>
            <input  v-model="media.Creator" class="form-control" id="input-name" placeholder="John Doe..">
          </div>

          <div class="form-group">
            <label for="input-title">
              Publisher
            </label>
            <input  v-model="media.Publisher" class="form-control" id="input-name" placeholder="Golden Records Inc..">
          </div>

          <div class="form-group" >
            <label for="input-author"> 
              UsageClass 
            </label>
            <select v-model="media.UsageClass" class="form-control" id="input-author">
              <option>Physical</option>
              <option>Digital</option>
            </select>
          </div>

          <div class="form-group">
            <label for="input-title">
              CheckoutType
            </label>
            <input  v-model="media.CheckoutType" class="form-control" id="input-name" placeholder="Horizon, Freegal, etc..">
          </div>

          <div class="form-group">
            <label for="input-pages">
              MaterialType
            </label>
            <input  v-model="media.MaterialType" class="form-control"  placeholder="VIDEODISC, SONG, etc..">
          </div>

          <div class="form-group">
            <label for="input-isbn">
              CheckoutYear
            </label>
            <input type='number' v-model="media.CheckoutYear" class="form-control" id="input-isbn">
          </div>

          <div class="form-group">
            <label for="input-isbn">
              CheckoutMonth
            </label>
            <input type='number' v-model="media.CheckoutMonth" class="form-control" id="input-isbn">
          </div>

          <div class="form-group">
            <button class="btn btn-info" @click="addMedia"> Add card </button>
          </div>

        </div>
      </section>`
});