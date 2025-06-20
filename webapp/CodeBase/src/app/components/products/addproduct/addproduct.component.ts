import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  dropdownData: any[] = [];
  keyword = 'name';
  //selectedFile: File | null = null;
  @ViewChild('multiSelect') multiSelect:any;
  public loadContent: boolean = false;
  public multiname = 'Cricketers';
  data!: any[];
  selectedFile: File | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
  allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  public settings = {};
  public selectedItems = [];
  public categories = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
  constructor(private fb: FormBuilder, private _productsservice: ProductsService) { }
 
  ngOnInit() {
   
    

    this._productsservice.getCategories().subscribe(data => {


      this.dropdownData = data;
      //console.log(this.dropdownData);
    });

    this.data = [
      { item_id: 1, item_text: 'Hanoi' },
      { item_id: 2, item_text: 'Lang Son' },
      { item_id: 3, item_text: 'Vung Tau' },
      { item_id: 4, item_text: 'Hue' },
      { item_id: 5, item_text: 'Cu Chi' },
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'unSelect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Placeholder Txt',
      noDataAvailablePlaceholderText: 'No Data',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.setForm();
    console.log(this.productForm.get('multiname'));
    console.log(this.productForm.get('multiname')); 
  }
  get f() {
    //console.log("in f");
    //console.log(this.productForm.get('multiname'));
    //return this.productForm.controls;
    return this.productForm.get('multiname') as FormControl;

  }
  selectEvent(item:any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any) {
    // do something
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Optionally, update the form control's value with the selected file
      this.productForm.patchValue({ file: this.selectedFile });
      this.productForm.get('file')?.updateValueAndValidity(); // Trigger validation if needed
    }
    else {
      this.selectedFile = null;
    }
  }
  get tagsArray() {
    return this.productForm.get('tags') as FormArray;
  }

  addTag() {
    this.tagsArray.push(new FormControl(''));
  }
  removeTag(index: number) {
    this.tagsArray.removeAt(index);
  }
  get variantsArray() {
    return this.productForm.get('variants') as FormArray;
  }

  createVariantFormGroup(): FormGroup {
    return this.fb.group({

      color: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addVariant() {
    this.variantsArray.push(this.createVariantFormGroup());
  }

  removeVariant(index: number) {
    this.variantsArray.removeAt(index);
  }

  onSubmit() {
    debugger;
    console.log(this.productForm.valid);
    if (this.productForm.valid) {
      if (this.productForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);

        //console.log(this.productForm.value);

        this._productsservice.saveProduct(this.productForm.value).subscribe(
          response => {
            console.log('POST request successful', response);
          },
          error => {
            console.error('Error during POST request', error);
          }
        );;
        // Handle form submission
      }
    }
    else {
      console.log(this.productForm.controls);
      const invalid = [];
      const controls = this.productForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log(invalid);
    }
  }

  /* multiselect */
 
  public onFilterChange(item: any) {
  //  console.log(item);
  }
  public onDropDownClose(item: any) {
  //  console.log(item);
  }

  public onItemSelect(item: any) {
  //  console.log(item);
  }
  public onDeSelect(item: any) {
 //   console.log(item);
  }

  public onSelectAll(items: any) {
  //  console.log(items);
  }
  public onDeSelectAll(items: any) {
  //  console.log(items);
  }
  // Custom validator for file type
  fileTypeValidator = (control: any) => {
    if (!this.selectedFile) return null;
    if (!this.allowedFileTypes.includes(this.selectedFile.type)) {
      return { invalidFileType: true };
    }
    return null;
  };

  // Custom validator for file size
  fileSizeValidator = (control: any) => {
    if (!this.selectedFile) return null;
    if (this.selectedFile.size > this.maxFileSize) {
      return { fileSizeExceeded: true };
    }
    return null;
  };

  public setForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      tags: this.fb.array([]), // FormArray for tags
      inStock: [true],
      imageUrl: [''],
      myAutocompleteControl: new FormControl('', Validators.required),
      myDate: new FormControl<NgbDateStruct | null>(null), // Initialize with null or a default NgbDateStruct
      file: new FormControl(null, [Validators.required, this.fileTypeValidator, this.fileSizeValidator]), // FormControl for the file
      multiname: new FormControl(this.data, Validators.required),
      additionalDetails: this.fb.group({ // Nested FormGroup
        manufacturer: [''],
        weight: [0]
      }),
      variants: this.fb.array([]) // FormArray for variants
    });
    this.loadContent = true;
    
  }
  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }
  /* multiselect */
}
