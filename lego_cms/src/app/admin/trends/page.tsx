"use client"

import NavbarAdmin from "@/component/navbar_admin";
import { useState } from "react";
import { Collapse } from "react-bootstrap";

export default function Trends() {
    const [showTrends, setShowTrends] = useState(false);
    return (
        <div>
            { }
            <div className="row">
                <div className="col-2">
                    <ul>
                        <li className="nav-item">
                            <a
                                onClick={() => setShowTrends(!showTrends)}
                                aria-controls="trends-collapse"
                                aria-expanded={showTrends}
                            >
                                Trends
                            </a>
                            <Collapse in={showTrends}>
                                {
                                    <div id="trends-collapse">
                                        <ul>
                                            <li>
                                                Product
                                            </li>
                                            <li>
                                                Stocks
                                            </li>
                                            <li>
                                                User
                                            </li>
                                            <li>
                                                Review
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </Collapse>
                        </li>
                        <li className="nav-item">
                            <a>
                                Mails
                            </a>
                        </li>
                        <li className="nav-item">
                            <a>
                                Users
                            </a>
                        </li>
                        <li className="nav-item">
                            <a>
                                Article
                            </a>
                        </li>
                        <li className="nav-item">
                            <a>
                                Stocks
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-7">
                    Ini Content
                </div>
            </div>
        </div>
    )
}