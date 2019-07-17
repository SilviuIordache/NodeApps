const getDetailedView = Vue.component('media-detailed', {
  mounted: function () {
    this.getMediaItem(this.$route.params.id);
  },
  data: function () {
    return {
      mediaItem: {}
    }
  },
  methods: {
      getMediaItem: function (id) {
        axios(`/media/${id}`)
        .then((resp) => {
          this.mediaItem = resp.data;
        })
      },
      trimTitle: (str) => {
      let arr = [];
      let newStr = '';
    
      if (str && str.includes('/')) {
        arr = str.split(' / ');
        newStr = arr[0];
        //newStr = newStr.slice(1);
        if (newStr.includes('[')) {
          arr = newStr.split(' [');
          newStr = arr[0];
        }
        str = newStr;
      }
      return str;
    },
  },
  template: `
  <div class="col col-md-6 col-xl-4">
    <article class="card mt-5"> 
      <section class="card-header"> 
        creator: {{ mediaItem.Creator }}
      </section>
      <section class="card-body">
        <h5 class="card-title text-center"> {{ mediaItem.Title }} </h5>
        <p class="card-text"> 
          <span class="font-weight-bold"> Category:</span> 
          <span class="font-weight-normal"> {{ mediaItem.MaterialType }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Type:</span> 
          <span class="font-weight-normal"> {{ mediaItem.UsageClass }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Publicated:</span> 
          <span class="font-weight-normal"> {{ mediaItem.PublicationYear }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Publisher:</span> 
          <span class="font-weight-normal"> {{ mediaItem.Publisher }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Subjects:</span> 
          <span class="font-weight-normal"> {{ mediaItem.Subjects }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Checkout Type:</span> 
          <span class="font-weight-normal"> {{ mediaItem.CheckoutType }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Checkouts No:</span> 
          <span class="font-weight-normal"> {{ mediaItem.Checkouts }} </span>
        </p>
        <p class="card-text"> 
          <span class="font-weight-bold"> Checkout Date:</span> 
          <span class="font-weight-normal"> {{ mediaItem.CheckoutMonth }} / {{ mediaItem.CheckoutYear }} </span>
        </p>
      </section>
      <div class="card-footer text-muted">
        <a> id: {{ mediaItem._id }}</a> 
      </div>
    </article>
  </div>
  `
});