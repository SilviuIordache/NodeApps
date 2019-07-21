const mediaForm = Vue.component('add-media', {
  mounted: function () {
    if(this.$route.query.id){
      this.getMediaItem(this.$route.query.id);
    }
  },
  data: function () {
    return {
      formIsValid: true,
      formFeedback: 'something',
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
        PublicationYear: ''
      }
    };
  },
  methods: {
    getMediaItem: function (id) {
      axios(`/media/${id}`)
        .then((resp) => {
          this.media = resp.data;
        })
    },
    validForm: function () {
      if (!this.media.Title) {
        this.formIsValid = false;
        this.formFeedback = `Please enter a title`;
        return false;
      } else {
        formIsValid = true;
        return true;
      }
    },
    addMedia: function () {
      if (this.validForm())
        axios.post('/media', {
          UsageClass: this.media.UsageClass,
          CheckoutType: this.media.CheckoutType,
          MaterialType: this.media.MaterialType,
          CheckoutYear: this.media.CheckoutYear,
          Checkouts: this.media.Checkouts,
          Title: this.media.Title,
          Creator: this.media.Creator,
          Subjects: this.media.Subjects,
          Publisher: this.media.Publisher,
          PublicationYear: this.media.PublicationYear
        }).then(() => {
          //to do: redirect
          router.push('/media?ord=desc&page=2');
        });
    },
    editMedia: function () {
      axios.put(`/media?id=${$route.query.id}`, {
        UsageClass: this.media.UsageClass,
        CheckoutType: this.media.CheckoutType,
        MaterialType: this.media.MaterialType,
        CheckoutYear: this.media.CheckoutYear,
        Checkouts: this.media.Checkouts,
        Title: this.media.Title,
        Creator: this.media.Creator,
        Subjects: this.media.Subjects,
        Publisher: this.media.Publisher,
        PublicationYear: this.media.PublicationYear
      }).then(() => {
        //to do: redirect
        router.push("/page/0?name=");
      });
    }
  },
  template: `
      <section class="container">
        <div class="card m-5">
        
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
              <label v-if="!formIsValid" for="input-isbn">
                <p class="text-danger">
                  {{ formFeedback }}
                </p>
              </label>
            </div>

            <div class="form-group">
              <button class="btn btn-info" @click="addMedia"> 
                Add Media 
              </button>
            </div>

          </div> 
        </div>
      </section>`
});