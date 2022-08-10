import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import './ImageUpload.css';

class ImageUpload extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      urls: [],
      isDragging: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(index) {
    var { files, urls } = this.state;
    let newFiles = files.filter((file, i) => i !== index);
    let newUrls = urls.filter((url, i) => i !== index);

    this.setState({
      ...this.state,
      files: newFiles,
      urls: newUrls,
    });
  }

  handleDrags(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: true,
    });
  }

  handleDragEnter(e) {
    this.handleDrags(e);
  }

  handleDragOver(e) {
    this.handleDrags(e);
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: false,
    });
  }

  onChange(e) {
    e.preventDefault();
    const files = e.target.files;
    [].forEach.call(files, this.handleFiles);
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer;
    const files = data.files;
    console.log('Oops...you dropped this: ', files);

    [].forEach.call(files, this.handleFiles);

    this.setState({
      ...this.state,
      isDragging: false,
    });
  }

  handleFiles(file) {
    var reader = new FileReader();

    reader.onloadend = () => {
      var imageUrl = window.URL.createObjectURL(file);

      this.setState({
        files: [file, ...this.state.files],
        urls: [imageUrl, ...this.state.urls],
      });
    };

    reader.readAsDataURL(file);
  }

  handleChangeGen = (event) => {
    if (event.target.type === 'file') {
      let e = event.target.files;
      this.props.setImage(e);
    }
  };
  render() {
    const { urls, files, isDragging } = this.state;
    const dropClass = isDragging ? 'dragDrop dragging' : 'dragDrop';

    return (
      <div>
        <div className="uploadInput">
          <input
            className={this.props.videoId > 0 ? 'disable-click' : ''}
            type="file"
            onChange={this.handleChangeGen}
            accept="video/mp4,video/x-m4v,video/*"
            multiple
          />
        </div>
      </div>
    );
  }
}
export default ImageUpload;
