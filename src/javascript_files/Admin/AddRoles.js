import React from "react";
import "../../css_files/Admin/AddRoles.css";
import CloseForm from "../Master/CloseForm";

function AddRoles({ setshowaddroleform }) {
  return (
    <div className="add-roles">
      <form>
        <h1>Create Role</h1>
        <blockquote>
          <label>Role Name</label>
          <select>
            <option value="">Select Role Name</option>
            <option value="Service-Co-Ordinator">Service-Co-Ordinator</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Purchase Manager">Purchase Manager</option>
            <option value="Technician">Technician</option>
          </select>
        </blockquote>
        <blockquote>
          <label>Select Pages</label>
          <aside>
            <mark>
              Category <input type="checkbox" />
            </mark>
            <mark>
              Sub-Category <input type="checkbox" />
            </mark>
            <mark>
              HSN <input type="checkbox" />
            </mark>
            <mark>
              Unit <input type="checkbox" />
            </mark>
            <mark>
              Packing <input type="checkbox" />
            </mark>
            <mark>
              Currency <input type="checkbox" />
            </mark>
            <mark>
              GST <input type="checkbox" />
            </mark>
            <mark>
              Parts <input type="checkbox" />
            </mark>
            <mark>
              Boiler <input type="checkbox" />
            </mark>
            <mark>
              Boiler Series <input type="checkbox" />
            </mark>
            <mark>
              Boiler Series Parts Mapping <input type="checkbox" />
            </mark>
            <mark>
              Courier <input type="checkbox" />
            </mark>
            <mark>
              Customer <input type="checkbox" />
            </mark>
            <mark>
              Customer Pricing <input type="checkbox" />
            </mark>
            <mark>
              Technician <input type="checkbox" />
            </mark>
          </aside>
        </blockquote>
        <blockquote>
          <label>Select Actions</label>
          <aside>
            <mark>
              Read <input type="checkbox" />
            </mark>
            <mark>
              Write <input type="checkbox" />
            </mark>
            <mark>
              Update <input type="checkbox" />
            </mark>
            <mark>
              Delete <input type="checkbox" />
            </mark>
          </aside>
        </blockquote>
        <button type="submit">Submit</button>
      </form>
      <CloseForm close={setshowaddroleform} />
    </div>
  );
}

export default AddRoles;
