import React, { useEffect, useState } from "react";
import CloseForm from "../Master/CloseForm";
import axios from "axios";
import "../../css_files/Admin/DetailsRoleTable.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function DetailsRoleTable({ setshowdetailsroletable, role, isAdmin }) {
  const [detailroles, setdetailroles] = useState([]);
  const [triggerupdate, settriggerupdate] = useState([]);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/Permissions/GetPermissionByRole?role=${role}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setdetailroles(res.data);
        settriggerupdate(Array.from({ length: res.data.length }, (_) => false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const [actions, setactions] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  function handlechange(e) {
    setactions({ ...actions, [e.target.value]: e.target.checked });
  }

  function handleUpdate(id, role, head, subhead) {
    const url = `${process.env.REACT_APP_API_URL}/api/Permissions`;
    axios
      .put(url, {
        id: id,
        Role: role,
        Head: head,
        SubHead: subhead,
        IsRead: actions.read,
        IsWrite: actions.write,
        IsUpdate: actions.update,
        IsDelete: actions.delete,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data, {
          position: "bottom-center",
        });
        setrefresh(!refresh);
        settriggerupdate((prev) => prev.map((_) => false));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to Update permissions", {
          position: "bottom-center",
        });
      });
  }

  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 11,
      }}
    >
      <section className="table details-role-table">
        <h1>Details Role Table</h1>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Head</th>
              <th>Sub Head</th>
              <th>Permissions</th>
              {isAdmin && (
                <th colSpan={2} align="center">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {detailroles.map((detailrole, index) => (
              <tr key={index}>
                {index === 0 && (
                  <td rowSpan={detailroles.length}>{detailrole.role}</td>
                )}
                <td>{detailrole.head}</td>
                <td>{detailrole.subHead}</td>
                <td>
                  {triggerupdate[index] ? (
                    <blockquote>
                      <mark>
                        Read:
                        <input
                          type="checkbox"
                          value="read"
                          checked={actions.read}
                          onChange={handlechange}
                        />
                      </mark>
                      <mark>
                        Write:
                        <input
                          type="checkbox"
                          value="write"
                          checked={actions.write}
                          onChange={handlechange}
                        />
                      </mark>
                      <mark>
                        Update:
                        <input
                          type="checkbox"
                          value="update"
                          checked={actions.update}
                          onChange={handlechange}
                        />
                      </mark>
                      <mark>
                        Delete:
                        <input
                          type="checkbox"
                          value="delete"
                          checked={actions.delete}
                          onChange={handlechange}
                        />
                      </mark>
                    </blockquote>
                  ) : (
                    <p>{`${detailrole.isRead ? "Read ," : ""} ${
                      detailrole.isWrite ? "Write ," : ""
                    } ${detailrole.isUpdate ? "Update ," : ""} ${
                      detailrole.isDelete ? "Delete" : ""
                    }`}</p>
                  )}
                </td>
                {isAdmin && (
                  <>
                    <td style={{ textAlign: "center" }}>
                      {triggerupdate[index] ? (
                        <i
                          className="fa-solid fa-xmark"
                          title="Close"
                          onClick={() =>
                            settriggerupdate((prev) => {
                              const arr = [...prev];
                              arr[index] = false;
                              return arr;
                            })
                          }
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-pen-to-square"
                          title="Edit"
                          onClick={() => {
                            settriggerupdate((prev) => {
                              return prev.map((_, i) => i === index);
                            });
                            setactions({
                              ...actions,
                              read: detailrole.isRead,
                              write: detailrole.isWrite,
                              update: detailrole.isUpdate,
                              delete: detailrole.isDelete,
                            });
                          }}
                        ></i>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {triggerupdate[index] ? (
                        <i
                          class="fa-solid fa-floppy-disk"
                          style={{ color: "green" }}
                          onClick={() =>
                            handleUpdate(
                              detailrole.id,
                              detailrole.role,
                              detailrole.head,
                              detailrole.subHead
                            )
                          }
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-trash"
                          title="Delete"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                axios
                                  .delete(
                                    `${process.env.REACT_APP_API_URL}/api/Permissions?id=${detailrole.id}`
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    toast.success(res.data, {
                                      position: "bottom-center",
                                    });
                                    setrefresh(!refresh);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    toast.error("Failed to delete", {
                                      position: "bottom-center",
                                    });
                                  });
                              }
                            });
                          }}
                        ></i>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <CloseForm close={setshowdetailsroletable} />
      </section>
    </section>
  );
}

export default DetailsRoleTable;
