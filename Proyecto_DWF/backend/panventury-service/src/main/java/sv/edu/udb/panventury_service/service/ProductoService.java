package sv.edu.udb.panventury_service.service;

import sv.edu.udb.panventury_service.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    Producto save(Producto producto);
    Producto update(Long id, Producto producto);
    void delete(Long id);
}
